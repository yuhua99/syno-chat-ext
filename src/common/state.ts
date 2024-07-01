import * as element from "./element"

type State = {
    isfocusOnChatMsgBox: boolean
}

export function getCurrentState(): State {
    let state: State = {
        isfocusOnChatMsgBox: false
    };

    let msgBox = element.chatMainMsgInputBox()
    if (msgBox && msgBox.classList.contains("x-form-focus")) {
        state.isfocusOnChatMsgBox = true
    }

    return state
}
