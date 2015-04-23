var mq_client = require('../../rpc/client');

function addUserEducationDetail(req, res) {
	var degree = req.param("Degree");
	var uni_name = req.param("University_Name");
	var courses = req.param("Courses");
	var yoj = new Date(req.param("YOJ"));
	yoj = yoj.getFullYear() + "-" + (yoj.getMonth() + 1) + "-" + yoj.getDate();
	var yoe = new Date(req.param("YOE"));
	yoe = yoe.getFullYear() + "-" + (yoe.getMonth() + 1) + "-" + yoe.getDate();
	var msg_payload = { "University_Name": uni_name, "Degree": degree, "userID": req.param("userID"), "email": req.session.email, "Courses": courses, "YOJ":yoj, "YOE":yoe, "type" : "add_user_education" };
		
	mq_client.make_request('profile_queue', msg_payload, function(err,results){
		
		console.log("Results: "+ results.code);
		if(err){
			console.log("Add User Education request Error");
			throw err;
		} else  {
			if(results.code === "200"){
				console.log("User Eduaction Record Added");
				res.send({"login":"Success", "status": true});
			} else {    
				console.log("Trouble Adding User Education Record");
				res.send({"login":"Fail", "status":false});
			}
		}  
	});
}

exports.addUserEducationDetail = addUserEducationDetail;