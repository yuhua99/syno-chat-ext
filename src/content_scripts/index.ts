// --------------- [ SCSS Style ] ---------------
import "./styles/content_scripts.scss";

// --------------- [ TS Module ] ----------------
import "./scripts/image_button.ts";
import "./scripts/keyboard_shortcut.ts";
import { setBackgroundColor } from "./scripts/style";


window.addEventListener("load", async function () {
    console.info("Content script loaded");
    setBackgroundColor();
});
