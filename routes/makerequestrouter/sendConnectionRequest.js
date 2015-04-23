var mq_client = require('../../rpc/client');

function sendConnectionRequest(req, res) {

	var msg_payload = { "senderUserID": req.param("senderUserID"), "sendRequestToUserID": req.param("sendRequestToUserID"), "type" : "send_connection_invitation" };
		
	mq_client.make_request('member_service_queue', msg_payload, function(err,results){
		
		console.log("Results: "+ results.code);
		if(err){
			console.log("Connection Request Seding request Error");
			throw err;
		} else  {
			if(results.code == '200'){
				console.log("Connection Sent successfully");
				res.send({"login":"Success", "status": true});
			} else {    
				console.log("Trouble in Sending User Connection Request");
				res.send({"login":"Fail", "status":false});
			}
		}  
	});
}

exports.sendConnectionRequest = sendConnectionRequest;