// --------------- [ SCSS Style ] ---------------
import "./styles/content_scripts.scss";

// --------------- [ TS Module ] ----------------
import "./scripts/image_button"
import "./scripts/keyboard_shortcut"
import "./scripts/mark_as_unread"

import {
    adjustBrightness,
    colorToHex,
    toColor
} from "./scripts/color"

export const bgColor = toColor("#424242")
export const bgColorDark = adjustBrightness(bgColor, -30)
export const bgColorLight = adjustBrightness(bgColor, 30)
export const primaryColor = toColor("#f1beb0")

function setProperty(name: string, value: string) {
    document.documentElement.style.setProperty('--' + name, value);
    console.log(name, value)
}

window.addEventListener("load", async function () {
    console.info("Content script loaded");
    setProperty('primary-color', colorToHex(primaryColor));
    setProperty('background-color', colorToHex(bgColor));
    setProperty('background-color-darker', colorToHex(bgColorDark));
    setProperty('background-color-lighter', colorToHex(bgColorLight));
});
