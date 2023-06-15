/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const PrimaryContract = require("./lib/primary-contract.js");
const DoctorContract = require("./lib/doctor-contract.js");

// module.exports.FabCar = FabCar;
module.exports.contracts = [PrimaryContract, DoctorContract];
