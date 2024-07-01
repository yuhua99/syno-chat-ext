// --------------- [ SCSS Style ] ---------------
import "./styles/content_scripts.scss";

// --------------- [ JS Module ] ----------------
import "./scripts/image_button.js";
import "./scripts/keyboard_shortcut.js";

import { getStorage } from "src/common/storage";
import {
    PRIMARY_COLOR,
    BG_COLOR,
} from "src/common/settings";

function getValue(_, value) {
    return value;
}

function setProperty(name, value) {
    document.documentElement.style.setProperty('--' + name, value);
    console.log(name, value)
}

function darkenColor(color, percent) {
    let [r, g, b] = color.match(/\w\w/g).map((c) => parseInt(c, 16));

    [r, g, b] = [r, g, b].map((c) => Math.floor(c * (1 - percent / 100)));

    let darkerColor = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

    return `#${darkerColor}`;
}

window.addEventListener("load", function () {
    console.info("Content script loaded");
    const primaryColor = getStorage(PRIMARY_COLOR, getValue) || "#f1beb0";
    const bgColor = getStorage(BG_COLOR, getValue) || "#424242";
    const darkBgColor = darkenColor(bgColor, 40);
    setProperty('primary-color', primaryColor);
    setProperty('background-color', bgColor);
    setProperty('background-color-darker', darkBgColor);
});
