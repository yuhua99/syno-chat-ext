// --------------- [ SCSS Style ] ---------------
import "./styles/content_scripts.scss";
// ----------------------------------------------

import { getStorage } from "../common/storage";
import {
    PRIMARY_COLOR,
    BG_COLOR,
    BORDER_COLOR,
} from "../common/settings";

function setProperty(name, value) {
    document.documentElement.style.setProperty('--' + name, value);
    console.log(name, value)
}

window.onload = function () {
    console.info("Content script loaded");
    getStorage(PRIMARY_COLOR, setProperty);
    getStorage(BG_COLOR, setProperty);
    getStorage(BORDER_COLOR, setProperty);
}
