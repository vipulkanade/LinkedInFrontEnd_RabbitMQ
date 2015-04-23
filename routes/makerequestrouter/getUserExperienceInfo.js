var mq_client = require('../../rpc/client');

function getUserExperienceInfo(req, res) {
	var msg_payload = { "emailID": req.session.email, "type" : "get_user_experience_info"};
	
	mq_client.make_request('profile_queue', msg_payload, function(err,results){
		
		console.log("Results: "+ results.code);
		if(err){
			console.log("Get User Experience INFO request Error");
			throw err;
		}
		else 
		{
			if(results.code === "200"){
				console.log("valid Login");
				res.send({"login":"Success", "status": true, "experienceDetail": results.experienceDetail});
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"login":"Fail", "status":false});
			}
		}  
	});
}


exports.getUserExperienceInfo = getUserExperienceInfo;