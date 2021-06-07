const mongoose = require("mongoose");
const customerSchema = mongoose.Schema({
	stbStatus: {
		type: String,
		required: true,
	},
	sn: {
		type: Number,
		required: true,
		unique: true,
	},
	activatedDate: {
		type: String,
		required: true,
	},
	server: {
		type: String,
		required: true,
	},
	stockLoc: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
});
module.exports = customer = mongoose.model("customer", customerSchema);
