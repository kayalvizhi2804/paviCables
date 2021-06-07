var User = require("../models/users");
var Customer = require("../models/customer");
const express = require("express");
const router = express.Router();

// Home Route @ Get
router.get("/customer", isLoggedIn, async (req, res) => {
	try {
		const total = await Customer.countDocuments({});
		const active = await Customer.countDocuments({ stbStatus: "Active" });
		const deactive = await Customer.countDocuments({ stbStatus: "Deactive" });
		res.render("customer", { act: active, deact: deactive, total: total });
	} catch (error) {
		console.log(error);
	}
});
router.get("/customeradd", isLoggedIn, async (req, res) => {
	res.render("customeradd");
});
router.post("/addcus", isLoggedIn, async (req, res) => {
	try {
		const customer = new Customer(req.body);
		customer.save();
		console.log(customer);
		res.redirect("/customeradd");
	} catch (error) {
		console.log(error);
	}
});
router.get("/report/:mode", isLoggedIn, async (req, res) => {
	try {
		var report;
		switch (req.params.mode) {
			case "Active":
				report = await Customer.find({ stbStatus: "Active" });
				break;
			case "De-active":
				report = await Customer.find({ stbStatus: "Deactive" });
				break;
			case "Total":
				report = await Customer.find({});
				break;
			default:
				report = await Customer.find({ sn: req.query.sn });
				break;
		}
		res.render("report", { customers: report });
	} catch (error) {
		console.log(error);
	}
});
router.get("/delete/:id", isLoggedIn, async (req, res) => {
	try {
		await Customer.findByIdAndRemove(req.params.id);
		res.redirect("/report/Total");
	} catch (error) {
		console.log(error);
	}
});
router.get("/edit/:id", isLoggedIn, async (req, res) => {
	try {
		const customer = await Customer.findById(req.params.id);
		res.render("editCus", { item: customer });
	} catch (error) {
		console.log(error);
	}
});
router.post("/update/:id", isLoggedIn, async (req, res) => {
	try {
		const customer = await Customer.findByIdAndUpdate(req.params.id, req.body);
		res.redirect("/report/Total");
	} catch (error) {
		console.log(error);
	}
});
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect("/login");
	}
}
module.exports = router;
