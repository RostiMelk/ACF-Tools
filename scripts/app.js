$(document).ready(function() {
	copyFieldName();
	openDocs();
	copyFieldCode();
	appendCopyCodeBtns();
	appendFieldNameOnEdit();
	appendFCExportBtn();
	exportFCLayout();
});

// Copy the field name feature:
function copyFieldName() {
	$("body").on("click", ".li-field-name", function() {
		copyStringToClipboard(this);
		copyMessage('Copied field name to clipboard!');
	});
}

// Open ACF Field documentation:
function openDocs() {
	$("body").on("click", ".li-field-type", function() {
		var type = $(this)
		.closest(".acf-field-object")
		.attr("data-type");
		var url = type.replace("_", "-");
		window.open("https://www.advancedcustomfields.com/resources/" + url, "_blank");
	});
}

// Copy ACF meta field code feature:
function appendCopyCodeBtns() {
	// Append copy field code button
	function appendCopyCodeBtn() {
		$('.acf-field-object:not([data-type="accordion"], [data-type="message"], [data-type="tab"]) .row-options')
			.append('<a class="button button-primary button-small copy-field-code exclude-sub-fields" title="Copy PHP code for this field" href="#">Copy code</a>');
	}
	appendCopyCodeBtn();
	// Append buttons to new fields
	$("body").on("click", ".add-field", function() {
		$(".copy-field-code").remove();
		setTimeout(function() {
			appendCopyCodeBtn();
		}, 10);
	});

	// Append copy all fields code button
	function appendCopyAllCodeBtn() {
		$('.acf-field-object[data-type="repeater"], .acf-field-object[data-type="group"]')
			.children(".handle")
			.find(".row-options")
			.append('<a class="button button-primary button-small copy-field-code include-sub-fields" title="Copy PHP code for this field and inner fields" href="#">Copy code with sub fields</a>');
	}
	appendCopyAllCodeBtn();

	// Append copy all fields code button new fields
	$("body").on("click", ".add-field", function() {
		$(".copy-field-code").remove();
		setTimeout(function() {
			appendCopyAllCodeBtn();
		}, 10);
	});
	$("body").on("change", ".acf-field-setting-type .field-type", function() {
		$(".copy-field-code.include-sub-fields").remove();
		setTimeout(function() {
			appendCopyAllCodeBtn();
		}, 1000);
	});
}

function getTypeOfField(thisField) {
	// Get type of field
	return thisField.closest(".acf-field-object").attr("data-type");
}

function getFieldName(thisField) {
	// Get field name
	return thisField
		.closest(".handle")
		.find(".li-field-name")
		.text()
		.trim();
}

function getReturnType(thisField, typeOfField) {
	// Output type for supported fields (This is used if a field has multiple types of output methods, such as Array, ID or URL)
	if (
		typeOfField == "image" ||
		typeOfField == "gallery" ||
		typeOfField == "link" ||
		typeOfField == "taxonomy" ||
		typeOfField == "user" ||
		typeOfField == "file"
	) {
		return thisField
			.closest(".acf-field-object")
			.find(".acf-field-setting-return_format li label.selected input")
			.val();
	} else {
		return null;
	}
}

function getSeniority(thisField) {
	// Check if sub element or not
	if (
		thisField
			.closest(".acf-field-object")
			.parents(".acf-field-setting-fc_layout").length ||
		thisField
			.closest(".acf-field-object")
			.parents(".acf-field-setting-sub_fields").length
	) {
		return "sub";
	} else {
		return "parent";
	}
}

function getPlace() {
	// Get field group place (basically checks if field is in options page or not)
	return $('.refresh-location-rule option[selected="selected"]').val();
}

function copyFieldCode() {
	// Copy field code
	$("body").on("click", ".copy-field-code", function() {
		var thisField = $(this),
		fieldName = getFieldName(thisField),
		typeOfField = getTypeOfField(thisField),
		returnType = getReturnType(thisField, typeOfField),
		seniority = getSeniority(thisField),
		place = getPlace(thisField),
		subFields = "";

		// If user clicked copy code with sub fields. This will get the first level of child items.
		if (thisField.hasClass("include-sub-fields")) {
			thisField
				.closest(".acf-field-object")
				.children(".settings")
				.children(".acf-table")
				.children(".acf-field-settings")
				.children(".acf-field-setting-sub_fields")
				.children(".acf-input")
				.children(".acf-field-list-wrap")
				.children(".acf-field-list")
				.children(".acf-field-object")
				.children(".handle")
				.find(".copy-field-code.exclude-sub-fields")
				.each(function() {
				var thisField = $(this),
					fieldName = getFieldName(thisField),
					typeOfField = getTypeOfField(thisField),
					returnType = getReturnType(thisField, typeOfField),
					seniority = getSeniority(thisField),
					place = getPlace(thisField);

				acf_field(appendCode = true, fieldName, typeOfField, returnType, seniority, place, "");

				subFields += sessionStorage.getItem("fieldcode");
			});
		}
		acf_field(appendCode = false, fieldName, typeOfField, returnType, seniority, place, subFields);

		// Clear session storage
		sessionStorage.removeItem("fieldcode");
	});
}

function appendFieldNameOnEdit() {
	$('body:not(.post-type-acf-field-group)').find('.acf-field').each(function() {
		var fieldName = $(this).attr('data-name'),
			fieldNameInfo = '<a href="#" class="post-edit-field-name-info dashicons dashicons-info acf-js-tooltip" title="'+fieldName+'">'+fieldName+'</a>';
		$(this).children('.acf-label').children('label').append(fieldNameInfo);
	});
	$('body').on('click', '.post-edit-field-name-info', function(e) {
		e.preventDefault();
		copyMessage('Copied field name to clipboard!');
		copyStringToClipboard($(this));
	})
}

// Export/import flexble content fields feature:
function appendFCExportBtn() {
	$(".acf-bl.acf-fl-actions").append('<li><a class="export-layout" href="#" title="Export Layout">Export</a></li>');
}
function exportFCLayout() {
	$("body").on('click', '.export-layout', function(e) {
		e.preventDefault();
		var thisFCLayout = $(this).closest('.acf-field.acf-field-setting-fc_layout');
		generateFCLayoutJson(thisFCLayout);
		console.log('export clicked');
	})
}