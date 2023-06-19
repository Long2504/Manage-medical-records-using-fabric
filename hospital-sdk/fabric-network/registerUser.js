"use strict";
import { registerUser } from "./app.js";

async function main() {
	try {
		await registerUser("647f0f9c56926b0f05f07ed4");
	} catch (error) {
		console.error(`Failed to register user "appUser": ${error}`);
		process.exit(1);
	}
}

main();
