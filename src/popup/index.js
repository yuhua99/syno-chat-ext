// --------------- [ SCSS Style ] ---------------
import "./styles/popup.scss";
// ----------------------------------------------

import { getStorage, setStorage } from "src/common/storage";
import {
    PRIMARY_COLOR,
    BG_COLOR,
    BORDER_COLOR,
} from "src/common/settings"

window.onload = function () {
    const primaryColorInput = document.getElementById('primaryColor')
    const bgColorInput = document.getElementById('backgroundColor')
    const borderColorInput = document.getElementById('borderColor')
    const saveButton = document.getElementById('save')

    saveButton.addEventListener('click', function () {
        setStorage(BG_COLOR, bgColorInput.value)
        setStorage(PRIMARY_COLOR, primaryColorInput.value)
        setStorage(BORDER_COLOR, borderColorInput.value)
    })
};
