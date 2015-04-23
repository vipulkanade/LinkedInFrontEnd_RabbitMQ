var mq_client = require('../../rpc/client');

function acceptConnectionRequest(req, res) {

	var msg_payload = { "senderUserID": req.param("senderUserID"), "acceptorUSerID": req.param("acceptorUSerID"), "type" : "accept_connection_invitation" };
		
	mq_client.make_request('member_service_queue', msg_payload, function(err,results){
		
		console.log("Results: "+ results.code);
		if(err){
			console.log("Connection Acceptance request Error");
			throw err;
		} else  {
			if(results.code == '200'){
				console.log("Connection accepted successfully");
				res.send({"login":"Success", "status": true});
			} else {    
				console.log("Trouble in Accepting User Connection Request");
				res.send({"login":"Fail", "status":false});
			}
		}  
	});
}

exports.acceptConnectionRequest = acceptConnectionRequest;