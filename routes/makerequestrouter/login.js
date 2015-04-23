var mq_client = require('../../rpc/client');

function after_login (req, res) {
	var email = req.param("email");
	var password = req.param("password");
	var msg_payload = { "email": email, "password": password, "type" : "login" };
		
	console.log("In POST Request = email:"+ email+" "+password);
	
	mq_client.make_request('login_queue', msg_payload, function(err,results){
		
		console.log("Results: "+ results.code);
		if(err){
			console.log("Post request Error");
			throw err;
		} else  {
			if(results.code === "200"){
				console.log("valid Login");
				console.log(results);
				req.session.email = results.emailID;
				req.session.token = results.token;
				req.session.userID = results.userID;
				console.log(req.session);
				res.send({"login":"Success", "status": true, "lastlog":results.lastlog, "token": results.token, "userID": results.userID});
			} else {    
				console.log("Invalid Login");
				res.send({"login":"Fail", "status":false});
			}
		}  
	});
}

exports.after_login = after_login;