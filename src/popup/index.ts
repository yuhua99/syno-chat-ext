// --------------- [ SCSS Style ] ---------------
import "./styles/popup.scss";
// ----------------------------------------------

import { getStorage, setStorage } from "common/storage";
import {
    PRIMARY_COLOR,
    BG_COLOR,
} from "common/settings"

document.addEventListener('DOMContentLoaded', async function() {
    const primaryColorInput = document.getElementById('primaryColor') as HTMLInputElement;
    const bgColorInput = document.getElementById('backgroundColor') as HTMLInputElement;
    const saveButton = document.getElementById('save');

    const primaryColorStored = await getStorage(PRIMARY_COLOR);
    if (primaryColorStored) {
        primaryColorInput.value = primaryColorStored;
    }
    const bgColorStored = await getStorage(BG_COLOR);
    if (bgColorStored) {
        bgColorInput.value = bgColorStored;
    }

    saveButton.addEventListener('click', async function () {
        await setStorage(PRIMARY_COLOR, primaryColorInput.value);
        await setStorage(BG_COLOR, bgColorInput.value);
    });
});
