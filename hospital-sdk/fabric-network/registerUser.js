"use strict";
import { registerUser } from "./app.js";

async function main() {
	try {
		await registerUser("longlong");
	} catch (error) {
		console.error(`Failed to register user "appUser": ${error}`);
		process.exit(1);
	}
}

main();
