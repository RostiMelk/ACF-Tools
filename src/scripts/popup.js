ready = (callback) => {
	if (document.readyState != "loading") callback();
	else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => { 
    var settingsKey = "acf_tools_settings";

    // Add animations after the modal is visible so we don't get that animate effect on load
    setTimeout(() => {
        document.querySelectorAll("#acfToolsUserSettings label").forEach(label => {
            label.classList.add("animate");
        });
    },100);

    // Check every checkbox that has setting = true
    chrome.storage.sync.get(settingsKey, function(data) {
        var userSettings = JSON.parse(data[settingsKey]);
        console.log(userSettings);
        Object.keys(userSettings).forEach(function(key) {
            console.log(key);
            document.querySelector("#acfToolsUserSettings #"+key ).checked = userSettings[key];
        })
    });

    // Update setting on change
    document.querySelectorAll("#acfToolsUserSettings input").forEach(setting => {
        setting.addEventListener("click", (e) => {
            var settingID = e.currentTarget.id;
            chrome.storage.sync.get(settingsKey, function(data) {
                var userSettings = JSON.parse(data[settingsKey]),
                    settingsVal = userSettings[settingID],
                    updatedSettingsVal = settingsVal == true ? false : true,
                    settings = {};

                userSettings = JSON.stringify({
                    [settingID]: updatedSettingsVal
                });
            
                settings[settingsKey] = userSettings;

                chrome.storage.sync.set(settings);
            });
        });
    });
});