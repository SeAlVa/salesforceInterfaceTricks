var loginInfo = [];

function loadOptions(){
	try{
		loginInfo = JSON.parse(localStorage["loginInfo"]);
	}catch(err){
		loginInfo = [];
	}
	document.querySelector('#loginInfo').value = JSON.stringify(loginInfo);
	var i = 0;
	for(; i < loginInfo.length; i++){
		var project = loginInfo[i];
		var projectRowSpan = 0;
		var foriRow = document.querySelector('#projects-table').insertRow(-1);
		var foriCell = foriRow.insertCell(-1);
		foriCell.addEventListener('click',function(){alert('Line 16');});
		foriCell.appendChild(document.createTextNode(project.Name));
		var j = 0;
		for(; j < project.ORGS.length; j++){
			var org = project.ORGS[j];
			var forjRow;
			if(j==0){
				forjRow = foriRow;
			}else{
				forjRow = document.querySelector('#projects-table').insertRow(-1);
			}
			var forjCell = forjRow.insertCell(-1);
			forjCell.appendChild(document.createTextNode(org.Name));
			var forjCell2 = forjRow.insertCell(-1);
			forjCell2.appendChild(document.createTextNode((org.Type=='PROD'?'Production / Developer':'Sandbox')));
			var k = 0;
			var forkRow = forjRow;
			for(; k < org.Users.length; k++){
				projectRowSpan++;
				var user = org.Users[k];
				
				if(k!=0){
					forkRow = document.querySelector('#projects-table').insertRow(-1);
				}
				var forkCell = forkRow.insertCell(-1);
				forkCell.appendChild(document.createTextNode(user.Name));
				forkCell = forkRow.insertCell(-1);
				forkCell.appendChild(document.createTextNode(user.username));
				forkCell = forkRow.insertCell(-1);
				forkCell.setAttribute('class','passwordCell');
				forkCell.appendChild(document.createTextNode(user.password));
				forkCell = forkRow.insertCell(-1);
				forkCell.appendChild(document.createTextNode((user.token==undefined?'< Unknown >':user.token)));
				forkCell = forkRow.insertCell(-1);
				//forkCell.appendChild(document.createTextNode('[ Edit ]'));
				forkCell.appendChild(createInput('image_delete',i + '_' + j + '_' + k + '_button'));
			}
			if(k == 0){
				forkRow.insertCell(-1).appendChild(document.createTextNode('New User'));
				
			}else{
				var newUserRow = document.querySelector('#projects-table').insertRow(-1);
				var newAliasCell = newUserRow.insertCell(-1);
				newAliasCell.appendChild(createInput('text',i + '_' + j + '_' + k + '_alias'));
				
				var newUserCell = newUserRow.insertCell(-1);
				newUserCell.appendChild(createInput('text',i + '_' + j + '_' + k + '_username'));
				
				var newPasswordCell = newUserRow.insertCell(-1);
				newPasswordCell.appendChild(createInput('password',i + '_' + j + '_' + k + '_password'));
				
				var newTokenCell = newUserRow.insertCell(-1);
				newTokenCell.appendChild(createInput('text',i + '_' + j + '_' + k + '_token'));
				
				var newActionCell = newUserRow.insertCell(-1);
				newActionCell.appendChild(createInput('image_save',i + '_' + j + '_' + k + '_button'));
				
				k++;
			}
			projectRowSpan++;
			forjCell.setAttribute('rowspan',k);
			forjCell2.setAttribute('rowspan',k);
		}
		
		if(j == 0){
			forjRow.insertCell(-1).appendChild(document.createTextNode('New User'));
		}else{
			var newOrgRow = document.querySelector('#projects-table').insertRow(-1);
			//ORG
			var newOrgCell = newOrgRow.insertCell(-1);
			newOrgCell.appendChild(createInput('text', i + '_' + j + '_0_ORG'));
			
			// ORGType
			newOrgCell = newOrgRow.insertCell(-1);
			
			newOrgCell.appendChild(createOrgPicker(i + '_' + j + '_0_ORGType'));
		
			// Username
			newOrgRow.insertCell(-1).appendChild(createInput('text', i + '_' + j + '_0_alias'));
			newOrgRow.insertCell(-1).appendChild(createInput('text', i + '_' + j + '_0_username'));
			newOrgRow.insertCell(-1).appendChild(createInput('password', i + '_' + j + '_0_password'));
			newOrgRow.insertCell(-1).appendChild(createInput('text', i + '_' + j + '_0_token'));
			newOrgRow.insertCell(-1).appendChild(createInput('image_save',i + '_' + j + '_0_button'));
			projectRowSpan++;
		}
		
		
		foriCell.setAttribute('rowspan',projectRowSpan);
	}
	var newProjectCell = document.querySelector('#projects-table').insertRow(-1);
	newProjectCell.insertCell(-1).appendChild(createInput('text', i + '_0_0_project'));
	newProjectCell.insertCell(-1).appendChild(createInput('text', i + '_0_0_ORG'));
	newProjectCell.insertCell(-1).appendChild(createOrgPicker(i + '_0_0_ORGType'));
	newProjectCell.insertCell(-1).appendChild(createInput('text', i + '_0_0_alias'));
	newProjectCell.insertCell(-1).appendChild(createInput('text', i + '_0_0_username'));
	newProjectCell.insertCell(-1).appendChild(createInput('password', i + '_0_0_password'));
	newProjectCell.insertCell(-1).appendChild(createInput('text', i + '_0_0_token'));
	newProjectCell.insertCell(-1).appendChild(createInput('image_save',i + '_0_0_button'));
}

function saveOptions(){
	localStorage["loginInfo"] = JSON.stringify(loginInfo);
}
document.addEventListener('DOMContentLoaded', function (){
	loadOptions();
	document.querySelector('#menu_projects').addEventListener('click', menu_projects_click);
	document.querySelector('#menu_export').addEventListener('click', menu_export_click);
	document.querySelector('#menu_import').addEventListener('click', menu_import_click);
	document.querySelector('#menu_about').addEventListener('click', menu_about_click);
	document.querySelector('#import_save').addEventListener('click', import_save);
});

function addElement(e){
	var elementID = e.target.id;
	var elementSplit = elementID.split('_');
	var i = elementSplit[0] - 0;
	var j = elementSplit[1] - 0;
	var k = elementSplit[2] - 0;

	var prefix = i + '_' + j + '_' + k + '_';
	var project, ORG, username, password;
	if(loginInfo[i] == undefined){
		loginInfo[i] = {"Name":document.getElementById(i+'_'+j+'_'+k+'_project').value,"ORGS":[]};
	}
	if(loginInfo[i].ORGS[j] == undefined){
		loginInfo[i].ORGS[j] = {"Name":document.getElementById(i+'_'+j+'_'+k+'_ORG').value,"Type":document.getElementById(prefix + 'ORGType').value,"Users":[]};
	}
	if(loginInfo[i].ORGS[j].Users[k] == undefined){
		loginInfo[i].ORGS[j].Users[k] = {"Name":document.getElementById(prefix + 'alias').value,"username":document.getElementById(prefix + 'username').value,"password":document.getElementById(prefix + 'password').value, "token":document.getElementById(prefix + 'token').value};
	}
	saveOptions();
	while( document.querySelector('#projects-table').rows.length > 1 ){
		document.querySelector('#projects-table').deleteRow(-1);
	}
	loadOptions();

}

function delElement(e){
	var elementID = e.target.id;
	var elementSplit = elementID.split('_');
	var i = elementSplit[0] - 0;
	var j = elementSplit[1] - 0;
	var k = elementSplit[2] - 0;

	loginInfo[i].ORGS[j].Users.splice(k,1);
	if(loginInfo[i].ORGS[j].Users.length == 0){
		loginInfo[i].ORGS.splice(j,1);
		if(loginInfo[i].ORGS.length == 0){
			loginInfo.splice(i,1);
		}
	}	

	saveOptions();
	while( document.querySelector('#projects-table').rows.length > 1 ){
		document.querySelector('#projects-table').deleteRow(-1);
	}
	loadOptions();

}

function import_save(e)
{
	localStorage["loginInfo"] = document.querySelector('#loginInfoImport').value;
	alert('Done');
	while( document.querySelector('#projects-table').rows.length > 1 ){
		document.querySelector('#projects-table').deleteRow(-1);
	}
	loadOptions();
	menu_projects_click();
}

function createInput(paramType, paramId, paramClass){
	var returned = document.createElement('input');
	if(paramType != undefined){
		returned.setAttribute('type',paramType.split('_')[0]);
		if(paramType.split('_')[0] == 'image'){
			switch(paramType.split('_')[1]){
				case 'save': returned.addEventListener('click',addElement); break;
				case 'delete': returned.addEventListener('click',delElement); break;
			}
			returned.setAttribute('src','resources/images/' + paramType.split('_')[1] + '.png');
		}
	}
	if(paramId != undefined)	returned.setAttribute('id',paramId);
	if(paramClass != undefined)	returned.setAttribute('class',paramClass);
	
	return returned;
}

function createOrgPicker(paramID){
	var returned = newOrgSelect = document.createElement('select');
	returned.setAttribute('id',paramID); 
	var newOrgOptionLogin = document.createElement('option');
	newOrgOptionLogin.appendChild(document.createTextNode('Production / Developer'));
	newOrgOptionLogin.setAttribute('value','PROD');
	returned.appendChild(newOrgOptionLogin);
	
	var newOrgOptionTest = document.createElement('option');
	newOrgOptionTest.appendChild(document.createTextNode('Sandbox'));
	newOrgOptionTest.setAttribute('value','DEV');
	returned.appendChild(newOrgOptionTest);
	return returned;
}

function menu_unclick(menu){
	document.querySelector('#menu_projects').setAttribute('class',menu=='projects'?'selected':'');
	document.querySelector('#projects').setAttribute('class','container selected ' + (menu=='projects'?'':'hidden'));
	document.querySelector('#menu_export').setAttribute('class',menu=='export'?'selected':'');
	document.querySelector('#export').setAttribute('class','container selected ' + (menu=='export'?'':'hidden'));
	document.querySelector('#menu_import').setAttribute('class',menu=='import'?'selected':'');
	document.querySelector('#import').setAttribute('class','container selected ' + (menu=='import'?'':'hidden'));
	document.querySelector('#menu_about').setAttribute('class',menu=='about'?'selected':'');
	document.querySelector('#about').setAttribute('class','container selected ' + (menu=='about'?'':'hidden'));
}
function menu_projects_click(){
	menu_unclick('projects');
}
function menu_export_click(){
	menu_unclick('export');
}
function menu_import_click(){
	menu_unclick('import');
}
function menu_about_click(){
	menu_unclick('about');
}
