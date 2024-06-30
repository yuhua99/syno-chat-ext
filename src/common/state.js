import * as element from "./element"

export function getCurrentState() {
    let state = {
        "isfocusOnChatMsgBox": false
    }

    let msgBox = element.chatMainMsgInputBox()
    if (msgBox && msgBox.classList.contains("x-form-focus")) {
        state.isfocusOnChatMsgBox = true
    }

    return state
}
