ready = (callback) => {
	if (document.readyState != "loading") callback();
	else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => { 
    var settingsKey = "acf_tools_settings";

    //Get strings
    LocalizeStrings();

    // Add animations after the popup is visible so we don't get that animate effect on load
    setTimeout(() => {
        document.querySelectorAll("#acfToolsUserSettings label").forEach(label => {
            label.classList.add("animate");
        });
    },100);

    // Check every checkbox that has setting = true
    chrome.storage.sync.get(settingsKey, function(data) {
        var userSettings = JSON.parse(data[settingsKey]);
        Object.keys(userSettings).forEach(function(key) {
            document.querySelector("#acfToolsUserSettings #"+key ).checked = userSettings[key];
        })
    });

    // Display selected value in select
    chrome.storage.sync.get(settingsKey, function(data) {
        var userSettings = JSON.parse(data[settingsKey]);
        for (i in userSettings) {
            var currentVal = userSettings[i];
            if(document.querySelector('#acfToolsUserSettings #'+i+' option') !== null) {
                document.querySelector('#acfToolsUserSettings #'+i+' option[value="'+currentVal+'"]').selected = 'selected';
            }
        }
    });

    // Update setting on change for checkbox
    document.querySelectorAll("#acfToolsUserSettings input[type=checkbox]").forEach(setting => {
        setting.addEventListener("click", (e) => {
            var settingID = e.currentTarget.id;
            chrome.storage.sync.get(settingsKey, function(data) {
                var userSettings = JSON.parse(data[settingsKey]),
                    settingsVal = userSettings[settingID],
                    updatedSettingsVal = settingsVal == true ? false : true,
                    settings = {};


                for (i in userSettings) {
                    if ( i == settingID ) {
                        userSettings[settingID] = updatedSettingsVal;
                    }
                }

                userSettings = JSON.stringify(userSettings);
                settings[settingsKey] = userSettings;
                chrome.storage.sync.set(settings);
            });
        });
    });

    // Update setting on change for select
    document.querySelectorAll("#acfToolsUserSettings select").forEach(setting => {
        setting.addEventListener("change", (e) => {
            var settingID = e.currentTarget.id;
            var settingValue = e.currentTarget.value;
            chrome.storage.sync.get(settingsKey, function(data) {

                var settings = {};
                var userSettings = JSON.parse(data[settingsKey]);

                for (i in userSettings) {
                    if ( i == settingID ) {
                        userSettings[settingID] = settingValue;
                    }
                }

                userSettings = JSON.stringify(userSettings);
                settings[settingsKey] = userSettings;
                chrome.storage.sync.set(settings);
            });
        });
    });

});