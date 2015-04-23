var mq_client = require('../../rpc/client');

function getConnectedPeopleList(req, res) {
	var msg_payload = { "userID": req.session.userID, "type" : "get_connected_people_result"};	
	
	mq_client.make_request('member_service_queue', msg_payload, function(err,results){
		
		console.log("Results: "+ results.code);
		if(err){
			console.log("Get Connected People Result Error");
			throw err;
		}
		else 
		{
			if(results.code == '200') {
				console.log("Connected People Searched Successfully");
				res.send({"login":"Success", "status": true, "connectedPeopleList": results.connectedPeopleList});
			} else {    
				console.log("Connected People Users could not be searched");
				res.send({"login":"Fail", "status":false});
			}
		}  
	});
}

exports.getConnectedPeopleList = getConnectedPeopleList;