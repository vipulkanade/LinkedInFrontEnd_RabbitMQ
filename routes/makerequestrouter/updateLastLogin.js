var mq_client = require('../../rpc/client');

function updateLastLogin(req, res) {
	
	var msg_payload = { "userID": req.param("userID"), "type" : "update_last_login_detail" };
		
	mq_client.make_request('login_queue', msg_payload, function(err,results){
		
		console.log("Results: "+ results.code);
		if(err){
			console.log("Update Last Login request Error");
			throw err;
		} else  {
			if(results.code === "200"){
				console.log("User Last Login Record Updated");
				res.send({"login":"Success", "status": true});
			} else {    
				console.log("Trouble Updating LAst Login User Record");
				res.send({"login":"Fail", "status":false});
			}
		}  
	});
}

exports.updateLastLogin = updateLastLogin;