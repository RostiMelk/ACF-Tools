$(document).ready(function () {
  copyFieldName();
  openDocs();
  // copyFieldCode();
});

function copyToClipboard(element) {
  var temp = $("<input>");
  $("body").append(temp);
  temp.val($(element).text().trim()).select();
  document.execCommand("copy");
  temp.remove();
  $("body").append('<div class="acftools-message">Copied to clipboard!</div>');
  setTimeout(function () {
    $(".acftools-message").remove();
  }, 3000);
}

function copyFieldName() {
  $("body").on("click", ".li-field-name", function () {
    copyToClipboard(this);
  });
}

function openDocs() {
  $("body").on("click", ".li-field-type", function () {
    var type = $(this)
      .closest(".acf-field-object")
      .data("type"),
      url = type.replace("_", "-");

    window.open(
      "https://www.advancedcustomfields.com/resources/" + url,
      "_blank"
    );
  });
}

function copyFieldCode() {
  // Append copy field code button
  $(".acf-field-object .row-options").append(
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
    if (fieldName == 'image') {
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
