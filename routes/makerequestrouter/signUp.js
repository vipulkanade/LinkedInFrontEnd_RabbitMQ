var ejs = require("ejs");
var mq_client = require('../../rpc/client');

function signUpNewUser(req, res) {

	var name = req.param("name");
	var password = req.param("password");
	var emailID =  req.param("emailID");
	var msg_payload = { "name": name, "password": password, "type" : "signup", "emailID": emailID };
		
	console.log("In POST Request = email:"+ emailID+" "+password + " " + name );
	
	mq_client.make_request('login_queue', msg_payload, function(err,results){
		
		console.log("Results: "+ results.code);
		if(err){
			console.log("Post request Error");
			throw err;
		}
		else 
		{
			if(results.code === 200){
				console.log("valid Login");
				res.send({"login":"Success", "status": true, "userAlreadyPresent":results.userAlreadyPresent});
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"login":"Fail", "status":false});
			}
		}  
	});

}

exports.signUpNewUser = signUpNewUser;