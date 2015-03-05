
var ejs = require("ejs");

function login(req, res) {
	ejs.renderFile('./views/login.html', function(err, result) {
		if (!err) {
			res.end(result);
		} else {
			res.end("An error occured");
			console.log(err);
		}
	}) ;
}

function successLogin(req, res) {
	req.session.usrname = req.params.user;
	ejs.renderFile('./views/successlogin.html', function(err, result){
		if(!err) {
			console.log("Success Page");
			res.end(result);
		} else {
			res.end("An error occured in Success Page");
			console.log(err);
		}
	});
}

function failLogin(req, res) {
	ejs.renderFile('./views/faillogin.html', function(err, result){
		if(!err) {
			console.log("Fail Page");
			res.end(result);
		} else {
			res.end("Error in Fail Login Page");
			console.log(err);
		}
	});
}

exports.login = login;
exports.successLogin = successLogin;
exports.failLogin = failLogin;