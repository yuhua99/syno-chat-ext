// import { getStorage } from "../../common/storage";
// import { PRESET_CONFIGURATION, CHROME_SYNC_STORAGE_KEY } from "../../common/settings";
//
// function loadConfiguration(result) {
//     const savedConfiguration = result || PRESET_CONFIGURATION;  
//     const storageValue = savedConfiguration["storageValue"];
//     console.info("Storage value", storageValue);
// }
//


import { getStorage, setStorage } from "../../common/storage";
import {
    PRIMARY_COLOR,
    BG_COLOR,
    BORDER_COLOR,
} from "../../common/settings"

window.onload = function() {
    const primaryColorInput = document.getElementById('primaryColor')
    const bgColorInput = document.getElementById('backgroundColor')
    const borderColorInput = document.getElementById('borderColor')
    const saveButton = document.getElementById('save')

    saveButton.addEventListener('click', function() {
        setStorage(BG_COLOR, bgColorInput.value)
        setStorage(PRIMARY_COLOR, primaryColorInput.value)
        setStorage(BORDER_COLOR, borderColorInput.value)
    })
};
