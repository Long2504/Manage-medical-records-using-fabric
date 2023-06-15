/**
 * @desc [Primary Smartcontract to initiate ledger with patient details]
 */

/*
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";

const { Contract } = require("fabric-contract-api");
let initPatients = require("./initLedger.json");

class PrimaryContract extends Contract {
    async initLedger(ctx) {
        console.info("============= START : Initialize Ledger ===========");
        for (let i = 0; i < initPatients.length; i++) {
            initPatients[i].docType = "patient";
            await ctx.stub.putState(
                "PID" + i,
                Buffer.from(JSON.stringify(initPatients[i]))
            );
            console.info("Added <--> ", initPatients[i]);
        }
        console.info("============= END : Initialize Ledger ===========");
    }

    async getAllMedicalRecord(ctx) {
        const startKey = "";
        const endKey = "";
        const allResults = [];
        for await (const { key, value } of ctx.stub.getStateByRange(
            startKey,
            endKey
        )) {
            const strValue = Buffer.from(value).toString("utf8");
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.err(`Error of getAllMedicalRecord: ${err}`);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async getMedicalRecordByIdPatient(ctx, idPatient) {
        console.info(idPatient);
        idPatient = JSON.parse(idPatient);
        const startKey = "";
        const endKey = "";
        const allResults = [];
        for await (const { key, value } of ctx.stub.getStateByRange(
            startKey,
            endKey
        )) {
            const strValue = Buffer.from(value).toString("utf8");
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.err(`Error of getMedicalRecordByIdPatient: ${err}`);
                record = strValue;
            }
            if (record.patientID === idPatient.toString()) {
                allResults.push(record);
            }
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async getMedicalRecordById(ctx, id) {
        id = JSON.parse(id);
        const startKey = "";
        const endKey = "";
        for await (const { key, value } of ctx.stub.getStateByRange(
            startKey,
            endKey
        )) {
            const strValue = Buffer.from(value).toString("utf8");
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.err(`Error of getMedicalRecordByIdPatient: ${err}`);
                record = strValue;
            }
            if (record.medicalRecordID === id) {
                return JSON.stringify({ Key: key, Record: record });
            }
        }
    }
}
module.exports = PrimaryContract;
