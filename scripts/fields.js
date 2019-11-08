function acf_field(fieldName, typeOfField, returnType) {
  if (typeOfField == "range") {
    var fieldCode = "<?php the_field('" + fieldName + "'); ?>";

  } else if (typeOfField == "text") {
    var fieldCode = "<?php the_field('" + fieldName + "'); ?>";

  } else if (typeOfField == "text_area") {
    var fieldCode = "<?php the_field('" + fieldName + "'); ?>";

  } else if (typeOfField == "button_group") {
    var fieldCode = "<?php if (get_field('" + fieldName + "') == 'value') {\n" + " \n" + "}";

  } else if (typeOfField == "check_box") {

  } else if (typeOfField == "radio_button") {

  } else if (typeOfField == "select") {

  } else if (typeOfField == "true_false") {

  } else if (typeOfField == "file") {

  } else if (typeOfField == "gallery") {

  } else if (typeOfField == "image") {

  } else if (typeOfField == "oembed") {

  } else if (typeOfField == "wysiwyg_editor") {

  } else if (typeOfField == "color_picker") {

  } else if (typeOfField == "date_picker") {

  } else if (typeOfField == "date_time_picker") {

  } else if (typeOfField == "google_map") {

  } else if (typeOfField == "time_picker") {

  } else if (typeOfField == "accordion") {

  } else if (typeOfField == "flexible_content") {

  } else if (typeOfField == "group") {

  } else if (typeOfField == "tab") {

  } else if (typeOfField == "clone") {

  } else if (typeOfField == "repeater") {

  } else if (typeOfField == "page_link") {

  } else if (typeOfField == "taxonomy") {

  } else if (typeOfField == "user") {

  } else if (typeOfField == "post_object") {

  } else if (typeOfField == "relationship") {

  } else {
    alert("Unsupported field, submit an issue on: \nhttps://github.com/RostiMelk/ACF-Tools");
  }

  if (typeof typeOfField != "undefined") {
    console.log('type of field: ' + typeOfField);
    console.log(fieldCode);
    copyToClipboard(fieldCode);
  }
}
