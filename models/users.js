const mongoose = require("mongoose");
const passportLocal = require("passport-local-mongoose");
const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
	},
});
userSchema.plugin(passportLocal);
module.exports = user = mongoose.model("user", userSchema);