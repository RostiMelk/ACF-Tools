$(document).ready(function() {
  copyFieldName();
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
    copyToClipboard(this);
  });
}
