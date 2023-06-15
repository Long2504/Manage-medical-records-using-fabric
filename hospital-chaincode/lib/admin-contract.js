const PrimaryContract = require("./primary-contract");

class AdminContract extends PrimaryContract {
    async getMedicalRecordByIdDoctor(ctx, args) {
        args = JSON.parse(args);
        console.info(
            "============= START : getMedicalRecordByIdDoctor ==========="
        );
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
                console.log(err);
                record = strValue;
            }
            if (record.doctor.doctorID === args.doctorID) {
                allResults.push({ Key: key, Record: record });
            }
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }
}
module.exports = AdminContract;
