chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.method == "getLocalStorage")
      sendResponse({data: localStorage[request.key]});
	else if(request.method == "getMonsanto")
	  sendResponse({data: JSON.stringify(JSON.parse(localStorage["loginInfo"])[0].ORGS[0].Users)});
	else if(request.method == "getLogin"){
	  var returned = [];
	  try{
	    var loginInfo = JSON.parse(localStorage["loginInfo"]);
	    var h = 0;
	    for(var i = 0; i < loginInfo.length; i++){
  	      for(var j = 0; j < loginInfo[i].ORGS.length; j++){
            if(loginInfo[i].ORGS[j].Type == 'PROD'){
		      for(var k = 0; k < loginInfo[i].ORGS[j].Users.length; k++){
			    returned[h] = loginInfo[i].ORGS[j].Users[k];
			    returned[h].ORGName = loginInfo[i].ORGS[j].Name;
			    returned[h].Project = loginInfo[i].Name;
			    h++;
			  }
		    }
		  }
	    }
	  }catch(err){}
	  sendResponse({data: JSON.stringify(returned)});
	}else if(request.method == "getTest"){
	  var returned = [];
	  try{
	    var loginInfo = JSON.parse(localStorage["loginInfo"]);
	    var h = 0;
	    for(var i = 0; i < loginInfo.length; i++){
	      for(var j = 0; j < loginInfo[i].ORGS.length; j++){
		    if(loginInfo[i].ORGS[j].Type == 'DEV'){
		      for(var k = 0; k < loginInfo[i].ORGS[j].Users.length; k++){
		        returned[h] = loginInfo[i].ORGS[j].Users[k];
			    returned[h].ORGName = loginInfo[i].ORGS[j].Name;
			    returned[h].Project = loginInfo[i].Name;
			    h++;
			  }
		    }
		  }
	    }
	  }catch(err){}
	  sendResponse({data: JSON.stringify(returned)});	
	}
    else	
      sendResponse({}); // snub them.
});