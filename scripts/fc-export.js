function getFCLayoutLabel(thisFCLayout) {
    return thisFCLayout.find('.layout-label').val();
}
function getFCLayoutName(thisFCLayout) {
    return thisFCLayout.find('.layout-name').val();
}
function getFCLayoutType(thisFCLayout) {
    return thisFCLayout.find('.acf-fc-meta-display select').val();
}
function getFCLayoutMin(thisFCLayout) {
    return thisFCLayout.find('.acf-fc-meta-min select').val();
}
function getFCLayoutMax(thisFCLayout) {
    return thisFCLayout.find('.acf-fc-meta-max select').val();
}

function generateFCLayoutJson(thisFCLayout) {
    var layoutJson = new Object();
    layoutJson.label = getFCLayoutLabel(thisFCLayout);
    layoutJson.name = getFCLayoutName(thisFCLayout);
    layoutJson.layout = getFCLayoutType(thisFCLayout);
    layoutJson.min = getFCLayoutMin(thisFCLayout);
    layoutJson.max = getFCLayoutMax(thisFCLayout);
    

    console.log(layoutJson);
}