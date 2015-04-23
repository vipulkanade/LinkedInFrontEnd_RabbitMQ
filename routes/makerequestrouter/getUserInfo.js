var mq_client = require('../../rpc/client');

function getuserInfo (req, res) {
	var token = req.headers.authorization;
	console.log("email" + req.session.email);
	var msg_payload = { "emailID": req.session.email, "type" : "getuserinfo"};
		
	console.log("In GET User_INFO Request = token:"+ token);
	
	mq_client.make_request('profile_queue', msg_payload, function(err,results){
		
		console.log("Results: "+ results.code);
		if(err){
			console.log("Get User_INFO request Error");
			throw err;
		}
		else 
		{
			if(results.code === "200"){
				console.log("valid Login");
				res.send({"login":"Success", "status": true, "user":results.user});
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"login":"Fail", "status":false});
			}
		}  
	});
}

exports.getuserInfo = getuserInfo;