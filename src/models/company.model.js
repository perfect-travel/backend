const mongoose = require("mongoose");

const { Schema } = mongoose;

// owner Schema
const companySchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
		},
		contact: {
			type: String,
		},
		email: {
			type: String,
		},
		address: {
			type: "string",
		},
		pan: {
			type: String,
		},
		gst: {
			type: String,
		},
		hsn: {
			type: String,
		},
	},
	{ timestamps: true }
);

const Company = mongoose.model("company", companySchema);
module.exports = Company;
