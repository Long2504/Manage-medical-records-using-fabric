/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const { Contract } = require("fabric-contract-api");

class FabCar extends Contract {
    async initLedger(ctx) {
        console.info("============= START : Initialize Ledger ===========");
        const cars = [
            {
                color: "blue",
                make: "Toyota",
                model: "Prius",
                owner: "Tomoko",
                object: {
                    name: "Tomoko",
                    age: 20,
                    test: [1, 2, 3, 4, 5],
                },
            },
            {
                color: "red",
                make: "Ford",
                model: "Mustang",
                owner: "Brad",
            },
            {
                color: "green",
                make: "Hyundai",
                model: "Tucson",
                owner: "Jin Soo",
            },
            {
                color: "yellow",
                make: "Volkswagen",
                model: "Passat",
                owner: "Max",
            },
            {
                color: "black",
                make: "Tesla",
                model: "S",
                owner: "Adriana",
            },
            {
                color: "purple",
                make: "Peugeot",
                model: "205",
                owner: "Michel",
            },
            {
                color: "white",
                make: "Chery",
                model: "S22L",
                owner: "Aarav",
            },
            {
                color: "violet",
                make: "Fiat",
                model: "Punto",
                owner: "Pari",
            },
            {
                color: "indigo",
                make: "Tata",
                model: "Nano",
                owner: "Valeria",
            },
            {
                color: "brown",
                make: "Holden",
                model: "Barina",
                owner: "Shotaro",
            },
        ];

        for (let i = 0; i < cars.length; i++) {
            cars[i].docType = "car";
            console.log(cars[i]);
            await ctx.stub.putState(
                "CAR" + i,
                Buffer.from(JSON.stringify(cars[i]))
            );
            console.info("Added <--> ", cars[i]);
        }
        // const moto = [
        //     {
        //         color: "blue",
        //         make: "Toyota",
        //         model: "Prius",
        //         owner: "T",
        //     },
        //     {
        //         color: "red",
        //         make: "Ford",
        //         model: "Mustang",
        //         owner: "B",
        //     },
        //     {
        //         color: "green",
        //         make: "Hyundai",
        //         model: "Tucson",
        //         owner: "J",
        //     },
        //     {
        //         color: "yellow",
        //         make: "Volkswagen",
        //         model: "Passat",
        //         owner: "M",
        //     },
        //     {
        //         color: "black",
        //         make: "Tesla",
        //         model: "S",
        //         owner: "A",
        //     },
        //     {
        //         color: "purple",
        //         make: "Peugeot",
        //         model: "205",
        //         owner: "M",
        //     },
        //     {
        //         color: "white",
        //         make: "Chery",
        //         model: "S22L",
        //         owner: "A",
        //     },
        //     {
        //         color: "violet",
        //         make: "Fiat",
        //         model: "Punto",
        //         owner: "P",
        //     },
        //     {
        //         color: "indigo",
        //         make: "Tata",
        //         model: "Nano",
        //         owner: "V",
        //     },
        //     {
        //         color: "brown",
        //         make: "Holden",
        //         model: "Barina",
        //         owner: "S",
        //     },
        // ];

        // for (let i = 0; i < moto.length; i++) {
        //     moto[i].docType = "moto";
        //     console.log(moto[i]);
        //     await ctx.stub.putState(
        //         "MOTO" + i,
        //         Buffer.from(JSON.stringify(moto[i]))
        //     );
        //     console.info("Added <--> ", moto[i]);
        // }
        console.info("============= END : Initialize Ledger ===========");
    }

    async queryCar(ctx, carNumber) {
        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        console.log(carAsBytes.toString());
        return carAsBytes.toString();
    }

    async createCar(ctx, args) {
        console.info("============= START : Create Car ===========");
        args = JSON.parse(args);
        console.log(args.carNumber);
        const car = {
            color: args.color,
            docType: "car",
            make: args.make,
            model: args.model,
            owner: args.owner,
        };
        console.log(car);
        try {
            await ctx.stub.putState(
                args.carNumber,
                Buffer.from(JSON.stringify(car))
            );
            console.info("============= END : Create Car ===========");
        } catch (error) {
            console.info(error);
        }
    }

    async queryAllCars(ctx) {
        const startKey = "";
        const endKey = "";
        const allResults = [];
        console.info("============= START : queryAllCars ===========");
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
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }
    async queryCarsByOwner(ctx, field, data) {
        const startKey = "";
        const endKey = "";
        const allResults = [];
        console.info("============= START : queryCarsByOwner ===========");
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
                console.log(err);
                record = strValue;
            }
            if (record[field] === data) {
                allResults.push({ Key: key, Record: record });
            }
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeCarOwner(ctx, carNumber, newOwner) {
        console.info("============= START : changeCarOwner ===========");
        console.log(carNumber, "carNumber");
        console.log(newOwner, "newOwner");

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info("============= END : changeCarOwner ===========");
    }
}

module.exports = FabCar;
