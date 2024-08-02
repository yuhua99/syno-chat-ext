// --------------- [ SCSS Style ] ---------------
import "./styles/content_scripts.scss";

// --------------- [ TS Module ] ----------------
import "./scripts/image_button"
import "./scripts/keyboard_shortcut"
import "./scripts/mark_as_unread"

import {
    adjustBrightness,
    colorToHex,
    colorToRgba,
    toColor,
    Color,
} from "./scripts/color"

function setProperty(name: string, value: string) {
    document.documentElement.style.setProperty('--' + name, value);
    console.log(name, value)
}

function setColor() {
    const bgColor = toColor("#424242")
    const bgColorDark = adjustBrightness(bgColor, -30)
    const bgColorLight = adjustBrightness(bgColor, 30)
    const primaryColor = toColor("#f1beb0")
    const offlineStatus: Color = { ...primaryColor, a: 0.3 }

    setProperty('primary-color', colorToHex(primaryColor));
    setProperty('background-color', colorToHex(bgColor));
    setProperty('background-color-darker', colorToHex(bgColorDark));
    setProperty('background-color-lighter', colorToHex(bgColorLight));
    setProperty('offline-status', colorToRgba(offlineStatus));
}

window.addEventListener("load", async function () {
    console.info("Content script loaded");
    setColor();
});
