var express = require("express");
var router = express.Router();

var Mocha = require("mocha");
var fs = require("fs");
var path = require("path");

var mocha = new Mocha();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
	// console.log("Time: ", Date.now());
	next();
});

router.get("/", function (req, res) {
 	res.send("LaBlended API v1");
});

router.post("/code", function (req, res) {
	var user = req.body.user;
	var exercise = req.body.exercise + ".js";
	var code = req.body.code;
	var results = [];

	var userFile = path.join(__dirname, "..", "data", user + "_" + exercise);
	var userDir = path.dirname(userFile);
	var testFile = path.join(__dirname, "..", "test", exercise);

	fs.readFile(testFile, function (err, test) {
		if(err) {
	        res.send({ "error": err });
	    }
	    
		if (!fs.existsSync(userDir)){
		    fs.mkdirSync(userDir);
		}
		
		fs.writeFile(userFile, code + "\n\n" + test, function(err) {
		    if(err) {
		        res.send({ "error": err });
		    }

		    mocha.addFile(userFile);

			mocha
				.run()
			    .on("test end", function(test) {
			    	var testResponse = {
			    		title: test.title,
			    		state: test.state,
			    		err: (test.err) ? test.err : null
			    	};
			        results.push(testResponse);
			    })
			    .on("end", function() {
		 			res.json({ "results": results });
			    });
		}); 
	});
});

module.exports = router;