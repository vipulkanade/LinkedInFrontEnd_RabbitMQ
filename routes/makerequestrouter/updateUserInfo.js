var mq_client = require('../../rpc/client');

function updateBasicUserInfo(req, res) {
	var name = req.param("name");
	var field = req.param("field");
	console.log(req.param("userID"));
	var msg_payload = { "name": name, "field": field, "userID": req.param("userID"),"email": req.session.email, "type" : "update_basic_user_info" };
		
	mq_client.make_request('profile_queue', msg_payload, function(err,results){
		
		console.log("Results: "+ results.code);
		if(err){
			console.log("Update Basic User request Error");
			throw err;
		} else  {
			if(results.code === "200"){
				console.log("User basic Record Updated");
				res.send({"login":"Success", "status": true});
			} else {    
				console.log("Trouble Updating Basic User Record");
				res.send({"login":"Fail", "status":false});
			}
		}  
	});
}

exports.updateUserBasicInfo = updateBasicUserInfo;