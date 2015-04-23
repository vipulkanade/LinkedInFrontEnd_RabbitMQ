var mq_client = require('../../rpc/client');

function getPendingConnectionsList(req, res) {
	var msg_payload = { "userID": req.session.userID, "type" : "get_pending_connections_result"};	
	
	mq_client.make_request('member_service_queue', msg_payload, function(err,results){
		
		console.log("Results: "+ results.code);
		if(err){
			console.log("Get Pending Connections People Result Error");
			throw err;
		}
		else 
		{
			if(results.code == '200') {
				console.log("Pending Connections Searched Successfully");
				res.send({"login":"Success", "status": true, "pendingConnectionList": results.pendingConnectionList});
			} else {    
				console.log("Pending Users connection could not be searched");
				res.send({"login":"Fail", "status":false});
			}
		}  
	});
}

exports.getPendingConnectionsList = getPendingConnectionsList;