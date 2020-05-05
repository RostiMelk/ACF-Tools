function setDefaultUserSettings() {
    settingsKey = "acf_tools_settings",

    userSettings = JSON.stringify({
        'ifStatement': true
    });

    var settings = {};

    settings[settingsKey] = userSettings;

    chrome.storage.sync.get(settingsKey, function(data) {
        if (typeof data.acf_tools_settings === 'undefined') {
            console.log('First time add settings');
            chrome.storage.sync.set(settings);
        }
    });
}