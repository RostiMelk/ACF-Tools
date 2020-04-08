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
		copyMessage('Copied code with sub fields to clipboard!');
	} else {
		copyMessage('Copied code to clipboard!');
	}
}

function fieldError() {
	alert("Unsupported field, submit an issue on: \nhttps://github.com/RostiMelk/ACF-Tools");
	throw new Error("Unsupported field, submit an issue on: https://github.com/RostiMelk/ACF-Tools");
}