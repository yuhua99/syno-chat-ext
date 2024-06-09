import { getStorage, setStorage } from "../../common/storage";
import {
  PRIMARY_COLOR,
  BG_COLOR,
  BORDER_COLOR,
} from "../common/settings"

function hexToRgb(hex) {
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return r + "," + g + "," + b;
}

function setProperty(name, value) {
  document.documentElement.style.setProperty(name, value);
  console.log(name, value)
}

document.addEventListener('DOMContentLoaded', function () {
  const primaryColorInput = document.getElementById('primaryColor')
  const bgColorInput = document.getElementById('backgroundColor')
  const saveButton = document.getElementById('save')

  // Load saved values
  getStorage(PRIMARY_COLOR, setProperty);
  getStorage(BG_COLOR, setProperty);
  getStorage(BORDER_COLOR, setProperty)

  saveButton.addEventListener('click', function () {
    const primaryColor = primaryColorInput.value
    const bgColor = bgColorInput.value

    setStorage(PRIMARY_COLOR, primaryColor)
    setStorage(BG_COLOR, bgColor)
  })
})

