$(document).ready(function() {
  copyFieldName();
  openDocs();
});

function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
  $("body").append('<div class="acftools-message">Copied to clipboard!</div>');
  setTimeout(function() {
    $(".acftools-message").remove();
  }, 3000);
}

function copyFieldName() {
  $("body").on("click", ".li-field-name", function() {
    var fixedFieldName = this.className.substring(1);
    copyToClipboard(fixedFieldName);
  });
}

function openDocs() {
  $("body").on("click", ".li-field-type", function() {
    var $type = $(this)
      .closest(".acf-field-object")
      .data("type");
    var $url = $type.replace("_", "-");
    window.open(
      "https://www.advancedcustomfields.com/resources/" + $url,
      "_blank"
    );
  });
}
