// --------------- [ SCSS Style ] ---------------
import "./styles/content_scripts.scss";

// --------------- [ JS Module ] ----------------
import "./keyboard_shortcut.js";

import { getStorage } from "src/common/storage";
import {
    PRIMARY_COLOR,
    BG_COLOR,
    BORDER_COLOR,
} from "src/common/settings";

function getValue(_, value) {
    return value;
}

function setProperty(name, value) {
    document.documentElement.style.setProperty('--' + name, value);
    console.log(name, value)
}

window.addEventListener("load", function () {
    console.info("Content script loaded");
    const primaryColor = getStorage(PRIMARY_COLOR, getValue) || "#f1beb0";
    const bgColor = getStorage(BG_COLOR, getValue) || "#424242";
    const borderColor = getStorage(BORDER_COLOR, getValue) || "#323232";
    setProperty('primary-color', primaryColor);
    setProperty('bg-color', bgColor);
    setProperty('border-color', borderColor);
});
