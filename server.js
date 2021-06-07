// Invoking packages
var express = require("express");
var path = require("path");
var app = express();
const port = 2000;
var config = require("config");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var dotEnv = require("dotenv");
var connectDB = require("./config/db");
connectDB();
dotEnv.config({ path: "./config/config.env" });
// models
var User = require("./models/users");
// Routes
var cableRoute = require("./routes/cables");
var userRoute = require("./routes/user");
// configs
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
var sessionE = require("express-session")({
	secret: "secret",
	resave: false,
	saveUninitialized: false,
});

// passport config
app.use(sessionE);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// header assign
app.use(function (req, res, next) {
	res.locals.curuser = req.user;
	next();
});
// Using Routes
app.use(cableRoute);
app.use(userRoute);

// Listener
app.listen(process.env.PORT || 2000 , function () {
	console.log("Server Started at 2000");
});
