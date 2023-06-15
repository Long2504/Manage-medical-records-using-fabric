"use strict";

const PrimaryContract = require("./primary-contract");

class DoctorContract extends PrimaryContract {
    //read medical record by field
    async readAllMedicalRecordByField(ctx, field, data) {
        console.info(field);
        console.info(data);
        const startKey = "";
        const endKey = "";
        const allResults = [];
        console.info(
            "============= START : getAllMedicalRecordOfField ==========="
        );
        console.log(ctx.stub);
        for await (const { key, value } of ctx.stub.getStateByRange(
            startKey,
            endKey
        )) {
            const strValue = Buffer.from(value).toString("utf8");
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.error(err);
                record = strValue;
            }

            if (record[field] === data.toString()) {
                allResults.push({ Key: key, Record: record });
            }
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    //get medical record by id doctor
    async getMedicalRecordByIdDoctor(ctx, idDoctor) {
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
            if (record.doctor.doctorID === idDoctor.toString()) {
                allResults.push(record);
            }
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }
    // create medical record
    async createMedicalRecord(ctx, args) {
        args = JSON.parse(args);
        console.info("============= START : Create Medical Record ===========");

        let medicalRecord = {
            medicalRecordID: args.medicalRecordID,
            docType: "medicalRecord",
            patientID: args.patientID,
            doctor: {
                doctorID: args.doctor.doctorID,
                name: args.doctor.name,
            },
            resultTestAndPhotos: {
                resultTest: args.resultTest,
            },
            symptonOfDisease: args.symptonOfDisease,
            diagosisOfDoctor: args.diagosisOfDoctor,
            treatmentProcess: args.treatmentProcess,
            diseaseProgression: args.diseaseProgression,
            prescription: args.prescription,
            date: args.date,
            note: args.note,
        };
        const buffer = Buffer.from(JSON.stringify(medicalRecord));
        await ctx.stub.putState(medicalRecord.medicalRecordID, buffer);
        console.info("============= END : Create Medical Record ===========");
    }

    async getQueryResultForQueryString(ctx) {
        console.info(
            "============= START : getQueryResultForQueryString ==========="
        );
        let resultsIterator = await ctx.stub.getQueryResult(
            JSON.stringify({
                selector: {
                    docType: "patient",
                },
            })
        );
        console.info(
            "getQueryResultForQueryString <--> ",
            resultsIterator,
            "============= END : getQueryResultForQueryString ==========="
        );
        console.info(JSON.parse(resultsIterator.response.payload));
        let results = await this.getAllPatientResults(resultsIterator, false);
        return JSON.stringify(results);
    }
}
module.exports = DoctorContract;
