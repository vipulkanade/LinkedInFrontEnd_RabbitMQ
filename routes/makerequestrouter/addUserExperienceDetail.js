var mq_client = require('../../rpc/client');

function addUserExperienceDetail(req, res) {
	var company = req.param("company");
	var jobTitle = req.param("jobTitle");
	var jobDesc = req.param("jobDesc");
	var startDate = new Date(req.param("startDate"));
	startDate = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
	var endDate = new Date(req.param("endDate"));
	endDate = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();
	var msg_payload = { "jobTitle": jobTitle, "company": company, "userID": req.param("userID"),"email": req.session.email, "jobDesc": jobDesc, "startDate":startDate, "endDate":endDate, "type" : "add_user_experience" };
		
	mq_client.make_request('profile_queue', msg_payload, function(err,results){
		
		console.log("Results: "+ results.code);
		if(err){
			console.log("Adding User Experience Detail");
			throw err;
		} else  {
			if(results.code === "200"){
				console.log("User Experience Record Added");
				res.send({"login":"Success", "status": true});
			} else {    
				console.log("Trouble Adding User Experience Record");
				res.send({"login":"Fail", "status":false});
			}
		}  
	});
}

exports.addUserExperienceDetail = addUserExperienceDetail;