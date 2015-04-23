var mq_client = require('../../rpc/client');

function addUserSkill(req, res) {
	var skill = req.param("skill");

	var msg_payload = { "skill": skill, "userID": req.param("userID"),"email": req.session.email, "type" : "add_user_skill" };
		
	mq_client.make_request('profile_queue', msg_payload, function(err,results){
		
		console.log("Results: "+ results.code);
		if(err){
			console.log("Add User Skill request Error");
			throw err;
		} else  {
			if(results.code === "200"){
				console.log("User Skill Record Added");
				res.send({"login":"Success", "status": true});
			} else {    
				console.log("Trouble adding User Skill Record");
				res.send({"login":"Fail", "status":false});
			}
		}  
	});
}

exports.addUserSkill = addUserSkill;