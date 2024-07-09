// --------------- [ SCSS Style ] ---------------
import "./styles/content_scripts.scss";

// --------------- [ JS Module ] ----------------
import "./scripts/image_button.ts";
import "./scripts/keyboard_shortcut.ts";
import "./scripts/mark_as_unread.ts"

import { getStorage } from "common/storage";
import {
    PRIMARY_COLOR,
    BG_COLOR,
} from "common/settings";

function setProperty(name: string, value: string) {
    document.documentElement.style.setProperty('--' + name, value);
    console.log(name, value)
}

function darkenColor(color: string, percent: number) {
    let [r, g, b] = color.match(/\w\w/g).map((c) => parseInt(c, 16));

    [r, g, b] = [r, g, b].map((c) => Math.floor(c * (1 - percent / 100)));

    let darkerColor = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

    return `#${darkerColor}`;
}

window.addEventListener("load", async function () {
    console.info("Content script loaded");
    const primaryColor = await getStorage(PRIMARY_COLOR) || "#f1beb0";
    const bgColor = await getStorage(BG_COLOR) || "#424242";
    const darkBgColor = darkenColor(bgColor, 40);
    setProperty('primary-color', primaryColor);
    setProperty('background-color', bgColor);
    setProperty('background-color-darker', darkBgColor);
});
