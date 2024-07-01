import hotkeys from 'hotkeys-js';

import { getCurrentState } from "src/common/state"
import * as element from "src/common/element"

// Handler
function openChatRoomSearch(event, handler) {
    let state = getCurrentState();
    if (state.isfocusOnChatMsgBox) {
        return;
    }

    element.chatRoomSearch().click()
    element.chatRoomSearchInputBox().click();
}

function escHandler(event, handler) {
    let state = getCurrentState();

    if (state.isfocusOnChatMsgBox) {
        element.chatMainMsgInputBox().blur();
    }
}

window.addEventListener("load", function (event) {
    // Register keyboard shortcut
    hotkeys('/', openChatRoomSearch);
    hotkeys('esc', {
        element: element.chatMainMsgInputBox(),
    }, escHandler);

    // whitelist filter
    var _oldFilter = hotkeys.filter;
    hotkeys.filter = function (event) {
        let whitelist = [
            element.chatMainMsgInputBox(),
        ]
        if (whitelist.includes(event.target)) {
            return true;
        }
        return _oldFilter(event);
    }
})
