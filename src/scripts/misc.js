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

function copyModalCode() {
	$("body").on('click', '#acftoolsCodeModal pre code', function() {
		code = $(this).text();
		copyCodeToClipboard(code, subFields = false);
	});
	$('#acftoolsCodeModal').find('pre').append('<span class="copy-code-info">Click to copy code.</span>');
}

function codeModal(openModal, fieldName, seniority, place) {
	var modal = $('<div id="acftoolsCodeModal"></div>'),
		modalInner = $('<div class="acftools-modal-inner"></div>'),
		modalClose = $('<a href="#" id="closeModal"><span class="dashicons dashicons-no"></span></a>');

	if(openModal == false) {
		// Remove existing modal if openModal is false
		$("#acftoolsCodeModal").remove();
	} else {
		// Create modal
		$('body').append(modal);
		// Append some general elements to the modal
		$(modal).append(modalInner);
		$(modalInner).append(modalClose);
		
		// Get modal HTML from /static/
		$.get(chrome.extension.getURL('/static/'+openModal+'.html'), function(data){
			$('#acftoolsCodeModal .acftools-modal-inner').append(data);
		});

		// Import gists to static file
		setTimeout(function() {
			$('#acftoolsCodeModal pre code').each(function() {
				if (typeof $(this).attr('data-gist') !== 'undefined') {
					var codeBlock = $(this),
						gist = codeBlock.attr('data-gist');

					$.get(chrome.extension.getURL('/static/gists-'+openModal+'/'+gist+'.txt'), function(data){
						// HTML tags should not be output as HTML
						data = data.replace(/</g, "&lt;");
						data = data.replace(/>/g, "&gt;");
						data = data.replace(/REPLACE_WITH_FIELD_NAME/g, fieldName);
						// Change to sub field if sub field
						if (seniority == 'sub') {
							data = data.replace('get_field', 'get_sub_field');
							data = data.replace('the_field', 'the_sub_field');
						}
						// Add options if options page
						if (place == 'options_page') {
							var fieldNameRe = new RegExp("'" + fieldName + "'", 'g');
							data = data.replace(fieldNameRe, "'" + fieldName + "', 'options'");
						}
						
						codeBlock.html(data);
					});
				}
			});
			// Add a function to copy code
			copyModalCode();
		},150);

		// Importing takes some time, so we add another delay
		setTimeout(function() {
			// Syntax highlighting to gist
			document.querySelectorAll('#acftoolsCodeModal pre code').forEach((block) => {
				hljs.highlightBlock(block);
			});
			// Show modal
			modal.addClass('active');
		},300);
	}
	// Close modal when X is clicked
	$("body").on('click', '#closeModal', function(e) {
		e.preventDefault();
		codeModal(false);
	})
}

function fieldError() {
	alert(chrome.i18n.getMessage('fieldError'));
	throw new Error(chrome.i18n.getMessage('fieldError'));
}