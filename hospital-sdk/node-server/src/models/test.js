import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
	time: {
		type: Array,
	},
	name: {
		type: String,
	},
});

const Test = mongoose.model("long", testSchema);

export default Test;
