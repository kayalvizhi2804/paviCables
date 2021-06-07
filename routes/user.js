var User = require("../models/users");
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Login Route @ GET
router.get("/", async (req, res) => {
	res.render("home");
});
router.get("/login", async (req, res) => {
	res.render("login");
});
// Login @ Post
router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/customer",
		failureRedirect: "/login",
	})
);

// SignUp Route @ Post
router.get("/register", (req, res) => {
	user = {
		username: "pavicables",
		password: "pavi1234",
	};
	signUpUser(req, res, user);
});

// Logout Route @Post
router.get("/logout", function (req, res) {
	req.logOut();
	res.redirect("/");
});

// Function for SignUp
function signUpUser(req, res, user) {
	User.register(
		new User({ username: user.username }),
		user.password,
		function (err, userAuth) {
			if (err) {
				console.log(err);
				res.redirect("/");
				return;
			} else {
				userAuth.save();
				passport.authenticate("local")(req, res, function () {
					res.redirect("/home");
					return;
				});
			}
		}
	);
}
module.exports = router;
