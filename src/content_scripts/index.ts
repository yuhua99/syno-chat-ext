// --------------- [ SCSS Style ] ---------------
import "./styles/content_scripts.scss"

// --------------- [ TS Module ] ----------------
import "./scripts/image_button"
import "./scripts/keyboard_shortcut"
import { bgColor, setBackgroundColor } from "./scripts/style"
import { colorToHex } from "./scripts/color"

function setProperty(name: string, value: string) {
    document.documentElement.style.setProperty('--' + name, value)
    console.log(name, value)
}

window.addEventListener("load", async function () {
    setProperty('background-color', colorToHex(bgColor))
    setBackgroundColor()
})
