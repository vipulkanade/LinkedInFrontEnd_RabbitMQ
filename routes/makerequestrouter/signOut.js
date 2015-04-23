var mq_client = require('../../rpc/client');

function signout (req, res) {

	var msg_payload = { "emailID": req.session.email, "type" : "sign_out_user"};
		
	console.log("In SignOut User Request");
	
	mq_client.make_request('login_queue', msg_payload, function(err,results){
		
		console.log("Results: "+ results.code);
		if(err){
			console.log("Signout request Error");
			throw err;
		}
		else 
		{
			if(results.code == "200"){
				console.log("Sign Out");
				req.session = null;
				res.send({"login":"Success", "status": true});
			}
			else {
				console.log("Error Signing Out");
				res.send({"login":"Fail", "status":false});
			}
		}  
	});
}

exports.signout = signout;