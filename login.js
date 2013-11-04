chrome.extension.sendRequest({method: "getLogin"}, function(response) {
	loginInfo = JSON.parse(response.data);
	var myid = chrome.i18n.getMessage("@@extension_id");
	
	var loginHTML = "<style>#login_form_box {height:auto;} table th.loginHelper{text-align: center; background: #fff url('/img/alohaSkin/grid_headerbg.gif') 0 bottom repeat-x;color: #000;font-size: .7em;font-weight: bold;padding: 5px 2px 4px 5px;}</style>\
	<div style=\"overflow-x:auto;\" class=\"loginbox_container\">\
		<table border=\"1\" width=\"264px\" style=\"border-collapse: collapse; \">\
			<tr>\
				<th class=\"loginHelper\">" + (chrome.extension.inIncognitoContext?"":"<div style=\"cursor:pointer;\" onClick=\"window.open('chrome-extension://"+myid+"/options.html','salesforceLoginHelper')\"><img title=\"Manage Login Information\" src=\"/img/icon/wrench16.png\"/></div>") + "</th>\
				<th class=\"loginHelper\">User</th>\
				<th class=\"loginHelper\">ORG</th>\
				<th class=\"loginHelper\">Project</th>\
			</tr>";
	
	var lastProject, lastORG, projectCounter, orgCounter;
	for(var i = 0; i < loginInfo.length; i++){
		var isChangedProject = lastProject != loginInfo[i].Project;
		var isChangedORG = lastORG != loginInfo[i].ORGName || isChangedProject;
		if(isChangedProject)
		{
			loginHTML = loginHTML.replace('#projectRowSpan',projectCounter);
			projectCounter=1;
		}else
		{
			projectCounter++;
		}
		if(isChangedORG)
		{
			loginHTML = loginHTML.replace('#ORGRowSpan',orgCounter);
			orgCounter=1;
		}else
		{
			orgCounter++;
		}
		loginHTML += "\
			<tr style=\"white-space: nowrap;\">\
				<td align=\"center\" style=\"padding:0px;\"><a style=\"padding-left:0px\" onClick=\"document.getElementById('username').value = '" + loginInfo[i].username + "';document.getElementById('password').value = '" + loginInfo[i].password + "';document.getElementById('Login').click();\" href=\"#\"><img src=\"/img/icon/perAccounts16.png\" title=\"Login\" /></a></td>\
				<td style=\"padding:2px;font-size: .7em;\">" + loginInfo[i].Name + "</td>\
				" + (isChangedORG?"<td style=\"padding:2px;font-size: .7em;\" rowspan=\"#ORGRowSpan\">" + loginInfo[i].ORGName + "</td>" :"") + "\
				" + (isChangedProject?"<td style=\"padding:2px;font-size: .7em;\" rowspan=\"#projectRowSpan\">" + loginInfo[i].Project + "</td>":"") + "\
			</tr>";
			lastProject = loginInfo[i].Project;
			lastORG = loginInfo[i].ORGName;
	}
	if(i!= 0)
	{
		loginHTML = loginHTML.replace('#projectRowSpan',projectCounter);
		loginHTML = loginHTML.replace('#ORGRowSpan',orgCounter);
	}
	loginHTML += "\
		</table>\
	</div>";

	$('#loginwidget').html($('#loginwidget').html() + loginHTML);
});