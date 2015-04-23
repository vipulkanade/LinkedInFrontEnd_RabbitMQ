var mq_client = require('../../rpc/client');

function getSearchResult(req, res) {
	var msg_payload = { "searchString": req.param("searchString"), "type" : "get_search_result"};	
	
	mq_client.make_request('member_service_queue', msg_payload, function(err,results){
		
		console.log("Results: "+ results.search);
		if(err){
			console.log("Get Search Result Error");
			throw err;
		}
		else 
		{
			if(results.code == '200') {
				console.log("User Searched Successfully");
				res.send({"login":"Success", "status": true, "search": results.search});
			} else {    
				console.log("Users could not be searched");
				res.send({"login":"Fail", "status":false});
			}
		}  
	});
}

exports.getSearchResult = getSearchResult;