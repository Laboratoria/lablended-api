var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("port", process.env.PORT || 9000);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/api/v1", routes);

app.listen(app.get("port"), function () {
	console.log("Running on http://localhost:" + app.get("port"));
});