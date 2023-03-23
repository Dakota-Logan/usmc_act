let createError  = require("http-errors"),
	express      = require("express"),
	path         = require("path"),
	cookieParser = require("cookie-parser"),
	logger       = require("morgan"),
	parser       = require("body-parser");

const loginRouter  = require("./routes/login"),
	  statusRouter = require("./routes/check_in"),
	  rosterRouter = require("./routes/roster");

const auth = require("./util/auth.js");


let app = express();

//* view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//* BODY PARSER
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json());
app.use(express.json());

//* JWT Parser


crypto   = require("crypto");
jwtUtils = require("./util/jwt_utils.js");

//* ROUTES
app.use("/", loginRouter);
app.use("/status", auth.authenticate, statusRouter);
app.use("/roster", auth.authenticate, auth.authorize, rosterRouter);

//* catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

//* error handler
app.use(function (err, req, res) {
	// console.log(err)
	if(err.statusCode = 401)
		req.redirect("/")
	// set locals, only providing error in development
	res["locals"].message = err.message;
	res["locals"].error   = req.app.get("env") === "development" ? err : {};
	
	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
