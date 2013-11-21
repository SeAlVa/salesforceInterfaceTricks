function injectJs(srcFile) {
    var scr = document.createElement('script');
    scr.src = srcFile;
    document.getElementsByTagName('head')[0].appendChild(scr);
}
injectJs(chrome.extension.getURL('jquery.js'));

$('#schemaBuilderToolbar').append('' + 
	'<ul style="float: right;margin-right:0px;border-right:0px;border-left: 1px solid #ccc;padding-left:6px;">' + 
		'<li>' + 
			'<a class="toolbarButton" id="toggle-header" data-uidsfdc="99">Toggle Header</a>' +
		'</li>' + 
	'</ul>');

$('.dropdown-child-menu').append('' + 
	'<li>' + 
		'<a id="fieldOption" class="viewOption">Hide Fields</a>' +
	'</li>');

$('.dropdown-child-menu').append('' +
	'<li>' +
		'<a id="wrapOption" class="viewOption">Unwrap Fields</a>' +
	'</li>');

$('#toggle\-header').click(function(){$('#AppBodyHeader, .bPageTitle').fadeToggle(function(){ $('#sidebar\\:indicator').click();$('#sidebar\\:indicator').click();});});

$('#fieldOption, #wrapOption').click(function(){$('.dropdown-child-menu').toggleClass('dropdown-child-menu-hidden');});


$('#fieldOption').toggle(function(){$('#fieldOption').text('Show Fields');},function(){$('#fieldOption').text('Hide Fields');});
$('#fieldOption').click(function(){if($('#wrapOption').text() == 'Unwrap Fields')$('.showMoreFields').fadeToggle();$('.scrollMe, #wrapOption').fadeToggle().promise().done(function(){document.getElementById('lineOption').click();document.getElementById('lineOption').click();});});

$('#wrapOption').toggle(function(){$('#wrapOption').text('Wrap Fields');},function(){$('#wrapOption').text('Unwrap Fields');});
$('#wrapOption').click(function(){$('.showMoreFields').toggle();$('.scrollMe').css('max-height',($('.scrollMe').css('max-height') == 'none'?'':'none'));});

