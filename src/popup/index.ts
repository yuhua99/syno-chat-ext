// --------------- [ SCSS Style ] ---------------
import "./styles/popup.scss";
// ----------------------------------------------

import { getStorage, setStorage } from "common/storage";
import {
    PRIMARY_COLOR,
    BG_COLOR,
} from "common/settings"

window.onload = function () {
    const primaryColorInput = document.getElementById('primaryColor') as HTMLInputElement
    const bgColorInput = document.getElementById('backgroundColor') as HTMLInputElement
    const saveButton = document.getElementById('save')

    saveButton.addEventListener('click', function () {
        setStorage(BG_COLOR, bgColorInput.value)
        setStorage(PRIMARY_COLOR, primaryColorInput.value)
    })
};
