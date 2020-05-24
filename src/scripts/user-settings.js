function setDefaultUserSettings() {
    settingsKey = "acf_tools_settings",

    userSettings = JSON.stringify({
        'ifStatement': true,
        'spacing': 'tab',
    });

    var settings = {};

    settings[settingsKey] = userSettings;

    chrome.storage.sync.get(settingsKey, function(data) {
        if (typeof data.acf_tools_settings === 'undefined') {
            chrome.storage.sync.set(settings);
        }
    });
}