var mq_client = require('../../rpc/client');

function updateUserExperienceInfo(req, res) {
	var name = req.param("name");
	var field = req.param("field");
	var msg_payload = { "name": name, "field": field, "userID": req.param("userID"), "expID" : req.param("expID"), "email": req.session.email, "type" : "update_user_experience_info" };
		
	mq_client.make_request('profile_queue', msg_payload, function(err,results){
		
		console.log("Results: "+ results.code);
		if(err){
			console.log("Update User Education request Error");
			throw err;
		} else  {
			if(results.code === "200"){
				console.log("User Education Record Updated");
				res.send({"login":"Success", "status": true});
			} else {    
				console.log("Trouble Updating Education of User");
				res.send({"login":"Fail", "status":false});
			}
		}  
	});
}

exports.updateUserExperienceInfo = updateUserExperienceInfo;