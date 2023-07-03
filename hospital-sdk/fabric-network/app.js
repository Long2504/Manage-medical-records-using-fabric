import { resolve, join } from "path";
import { fileURLToPath } from "url";
import path from "path";
import { existsSync, readFileSync } from "fs";
import { Wallets, Gateway } from "fabric-network";
import FabricCAServices from "fabric-ca-client";

const channelName = "health-management";
const chaincodeName = "fabcar";
const mspHosp1 = "Org1MSP";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const walletPath = path.join(__dirname, "wallet");

export const buildCCHospital = () => {
	// load the network configuration
	const ccpPath = resolve(
		__dirname,
		"..",
		"..",
		"hospital-network",
		"organizations",
		"peerOrganizations",
		"org1.example.com",
		"connection-org1.json"
	);
	const fileExists = existsSync(ccpPath);
	if (!fileExists) {
		throw new Error(`no such file or directory: ${ccpPath}`);
	}
	const ccp = JSON.parse(readFileSync(ccpPath, "utf8"));
	return ccp;
};

export const buildCAClient = (ccp) => {
	// Create a new CA client for interacting with the CA.
	const caInfo = ccp.certificateAuthorities["ca.org1.example.com"]; // lookup CA details from config
	const caTLSCACerts = caInfo.tlsCACerts.pem;
	const caClient = new FabricCAServices(
		caInfo.url,
		{ trustedRoots: caTLSCACerts, verify: false },
		caInfo.caName
	);
	console.log(`Built a CA Client named ${caInfo.caName}`);
	return caClient;
};

export const buildWallet = async (walletPath) => {
	// Create a new file system based wallet for managing identities.
	const wallet = await Wallets.newFileSystemWallet(walletPath);
	return wallet;
};

export const connectToNetwork = async (id) => {
	const cpp = buildCCHospital();
	const gateway = new Gateway();
	try {
		const wallet = await buildWallet(walletPath);
		const userExists = await wallet.get(id);
		if (!userExists) {
			console.log(
				`An identity for the user ${id} does not exist in the wallet`
			);
			console.log("Run the registerUser.js application before retrying");
			return {
				status: 404,
				error: `An identity for the user ${id} does not exist in the wallet`,
			}
		}

		await gateway.connect(cpp, {
			wallet,
			identity: id,
			discovery: { enabled: true, asLocalhost: true },
		});

		// Get the network (channel) our contract is deployed to.
		const network = await gateway.getNetwork(channelName);
		// Get the contract from the network.
		const contract = network.getContract(chaincodeName);
		const networkObj = {
			contract: contract,
			network: network,
			gateway: gateway,
		};
		console.log("Succesfully connected to the network.");
		return networkObj;
	} catch (error) {

		console.error(`Failed to submit transaction (connectToNetwork): ${error}`);
		return {
			status: 500,
			error: `Failed to submit transaction (connectToNetwork): ${error}`,
		}
	}
};

export const checkUserExists = async (id) => {
	const wallet = await buildWallet(walletPath);
	const userExists = await wallet.get(id);
	if (!userExists) {
		console.log(`An identity for the user ${id} does not exist in the wallet`);
		console.log("Run the registerUser.js application before retrying");
		return false;
	}
	return true;
};

export const registerUser = async (id) => {
	const ccp = buildCCHospital();
	try {
		const wallet = await buildWallet(walletPath);
		const caURL = ccp.certificateAuthorities["ca.org1.example.com"].url;
		const ca = new FabricCAServices(caURL);
		const adminIdentity = await wallet.get("admin");
		if (!adminIdentity) {
			console.log(
				'An identity for the admin user "admin" does not exist in the wallet'
			);
			console.log("Run the enrollAdmin.js application before retrying");
			return;
		}
		// build a user object for authenticating with the CA
		const provider = wallet
			.getProviderRegistry()
			.getProvider(adminIdentity.type);
		const adminUser = await provider.getUserContext(adminIdentity, "admin");
		// Register the user, enroll the user, and import the new identity into the wallet.
		const secret = await ca.register(
			{
				affiliation: "org1.department1",
				enrollmentID: id,
				role: "client",
			},
			adminUser
		);
		const enrollment = await ca.enroll({
			enrollmentID: id,
			enrollmentSecret: secret,
		});
		const x509Identity = {
			credentials: {
				certificate: enrollment.certificate,
				privateKey: enrollment.key.toBytes(),
			},
			mspId: "Org1MSP",
			type: "X.509",
		};
		await wallet.put(id, x509Identity);
		console.log(
			`Successfully registered and enrolled admin user ${id} and imported it into the wallet`
		);
		return true;
	} catch (error) {
		console.error(`Failed to submit transaction (registerUser): ${error}`);
		return {
			error: error,
			status: 500,
		}
	}
};

export const invoke = async (networkObj, isQuery, fcn, args) => {
	try {
		const contract = networkObj.contract;
		let result;
		console.log("isQuery: ", isQuery);
		console.log("fcn: ", fcn);
		console.log("args: ", args);
		if (isQuery) {
			result = await contract.evaluateTransaction(fcn, ...args);
		} else {
			result = await contract.submitTransaction(fcn, ...args);
		}
		console.log(
			`Transaction has been evaluated, result is: ${result.toString()}`
		);
		return result.toString();
	} catch (error) {
		console.error(`Failed to submit transaction (invoke): ${error}`);
		return {
			error: error,
			status: 500,
		}
	}
};

export const createMedicalRecordNetwork = async (medicalRecord) => {
	try {
		const networkObj = await connectToNetwork(medicalRecord.doctor.doctorID);
		let data = [JSON.stringify(medicalRecord)];
		await invoke(networkObj, false, "DoctorContract:createMedicalRecord", data);
	} catch (error) {
		console.error(
			`Failed to submit transaction (createMedicalRecordNetwork): ${error}`
		);
		return {
			error: error,
			status: 500,
		};
	}
};

export const updateMedicalRecordNetwork = async (medicalRecord, doctorID) => {
	try {
		const networkObj = await connectToNetwork(doctorID);

		const result = await invoke(networkObj, true, "getMedicalRecordById", [
			JSON.stringify(medicalRecord.medicalRecordID),
		]);
		const { Record } = JSON.parse(result);
		if (!Record) {
			return {
				error: `Medical Record with id ${medicalRecord.medicalRecordID} not found`,
				status: 404,
			};
		}
		const medicalRecordUpdate = {
			...Record,
			...medicalRecord,
		};
		console.log(medicalRecordUpdate);
		let data = [JSON.stringify(medicalRecordUpdate)];

		await invoke(networkObj, false, "DoctorContract:updateMedicalRecord", data);
		return medicalRecordUpdate;
	} catch (error) {
		console.error(
			`Failed to submit transaction (updateMedicalRecordNetwork): ${error}`
		);
		return {
			error: error,
			status: 500,
		};
	}
};

export const getAllMedicalRecordsNetwork = async (id) => {
	try {
		const networkObj = await connectToNetwork(id);
		let data = [];
		let result = await invoke(networkObj, true, "getAllMedicalRecord", data);
		return JSON.parse(result);
	} catch (error) {
		console.error(
			`Failed to submit transaction (getAllMedicalRecordsNetwork): ${error}`
		);
	}
};

export const getMedicalRecordByIdPatientNetwork = async (idPatient) => {
	try {
		const networkObj = await connectToNetwork(idPatient);
		if (networkObj.error) {
			return networkObj;
		}
		let data = [idPatient];
		let result = await invoke(
			networkObj,
			true,
			"getMedicalRecordByIdPatient",
			data
		);
		if (result.error) {
			console.log(result.error);
			return result;
		}
		return JSON.parse(result);
	} catch (error) {
		console.error(
			`Failed to submit transaction (getMedicalRecordByIdPatientNetwork): ${error}`
		);
		return {
			error: error,
			status: 500,
		};
	}
};

export const getMedicalRecordByIdDoctorNetwork = async (idDoctor) => {
	try {
		const networkObj = await connectToNetwork(idDoctor);
		let data = [idDoctor];
		let result = await invoke(
			networkObj,
			true,
			"DoctorContract:getMedicalRecordByIdDoctor",
			data
		);
		return JSON.parse(result);
	} catch (error) {
		console.error(
			`Failed to submit transaction (getMedicalRecordByIdDoctorNetwork): ${error}`
		);
		return {
			error: error,
			status: 500,
		};
	}
};
