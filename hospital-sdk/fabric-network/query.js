/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

import { connectToNetwork, invoke } from "./app.js";

async function main() {
	try {
		// const result = await contract.submitTransaction(
		//     "FabCar:createCar",
		//     JSON.stringify({
		//         carNumber: "CAR13",
		//         color: "blue",
		//         make: "Honda",
		//         model: "Prius",
		//         owner: "Longfellow",
		//     })
		// );

		// const result3 = await contract.submitTransaction(
		// 	"changeCarOwner",
		// 	"CAR12",
		// 	"Long"
		// );
		// const result = await contract.evaluateTransaction(
		// 	"queryCarsByOwner",
		// 	"Long"
		// );
		// console.log("Transaction has been submitted" + result);
		const networkObj = await connectToNetwork("long1");
		// await invoke(networkObj, true, "queryCarsByOwner", ["color", "blue"]);
		// let args = {
		// 	carNumber: `CAR${Date.now()}`,
		// 	color: "blue",
		// 	make: "Honda",
		// 	model: "Prius",
		// 	owner: "Longfellow",
		// };
		// args = [JSON.stringify(args)];
		// console.log(args);
		// await invoke(networkObj, false, "createCar", args);
		await invoke(
			networkObj,
			true,
			"DoctorContract:readAllMedicalRecordByField",
			// [JSON.stringify({ medicalRecordID: "1" })]
			["medicalRecordID", "1"]
		);
		// Disconnect from the gateway.
		await networkObj.gateway.disconnect();
	} catch (error) {
		console.error(`Failed to evaluate transaction: ${error}`);
		process.exit(1);
	}
}

await main();
