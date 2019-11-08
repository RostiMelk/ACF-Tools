$(document).ready(function () {
  copyFieldName();
  openDocs();
  copyFieldCode();
});

function copyMessage() {
  $("body").append('<div class="button button-primary button-small acftools-message">Copied to clipboard!</div>');
  setTimeout(function () {
    $(".acftools-message").remove();
  }, 3000);
}

function copyToClipboard(element) {
  var temp = $("<input>");
  $("body").append(temp);
  temp.val($(element).text().trim()).select();
  document.execCommand("copy");
  temp.remove();
  copyMessage();
}

function copyCodeToClipboard(element) {
  var temp = $('<textarea></textarea>').val(element).appendTo('body').select()
  document.execCommand('copy')
  copyMessage();
}

function copyFieldName() {
  $("body").on("click", ".li-field-name", function () {
    copyToClipboard(this);
  });
}

function openDocs() {
  $("body").on("click", ".li-field-type", function () {
    var type = $(this).closest(".acf-field-object").data("type");
    var url = type.replace("_", "-");

    window.open("https://www.advancedcustomfields.com/resources/" + url, "_blank");
  });
}

function fieldError() {
  alert("Unsupported field, submit an issue on: \nhttps://github.com/RostiMelk/ACF-Tools");
}

function copyFieldCode() {
  // Append copy field code button
  $('.acf-field-object:not([data-type="accordion"], [data-type="message"], [data-type="tab"]) .row-options').append(
    '<a class="button button-primary button-small copy-field-code" title="Copy PHP code for this field" href="#">Copy code</a>'
  );

  $("body").on("click", ".copy-field-code", function () {
    // Get type of field
    var typeOfField = $(this)
      .closest(".acf-field-object")
      .data("type");

    // Get field name
    var fieldName = $(this)
      .closest(".handle")
      .find(".li-field-name")
      .text()
      .trim();

    // Ouput type for supported fields
    if (fieldName == 'image' ||
      fieldName == 'gallery' ||
      fieldName == 'link' ||
      fieldName == 'taxonomy' ||
      fieldName == 'user' ||
      fieldName == 'file') {
      var returnType = $(this)
        .closest(".acf-field-object")
        .find(".acf-field-setting-return_format input:checked")
        .val();
    } else {
      var returnType = null;
    }

    acf_field(fieldName, typeOfField, returnType);
  });
}
