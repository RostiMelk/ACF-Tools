function copyMessage(message) {
	$(".acftools-message").remove();
	var dismissBtn = '<button type="button" class="notice-dismiss"><span class="screen-reader-text">Dismiss this notice.</span></button>';
	$("body").append('<div class="acftools-message notice notice-success is-dismissible"><p>'+message+'</p>'+dismissBtn+'</div>');
	$("body").on('click', '.acftools-message .notice-dismiss', function() {
		$(".acftools-message").remove();
	})
}

function copyStringToClipboard(element) {
    var temp = $("<input>");
    $("body").append(temp);
    temp
      .val(
          $(element)
              .text()
              .trim()
      )
      .select();
    document.execCommand("copy");
    temp.remove();
}

function copyCodeToClipboard(fieldCode, subFields) {
	var temp = $("<textarea></textarea>")
		.val(fieldCode)
		.appendTo("body")
		.select();
	document.execCommand("copy");
	temp.remove();
	
	if(subFields.length) {
		copyMessage(chrome.i18n.getMessage('copiedCodeSub'));
	} else {
		copyMessage(chrome.i18n.getMessage('copiedCode'));
	}
}

function fieldError() {
	alert(chrome.i18n.getMessage('fieldError'));
	throw new Error(chrome.i18n.getMessage('fieldError'));
}
