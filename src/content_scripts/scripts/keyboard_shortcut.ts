import hotkeys, { HotkeysEvent } from 'hotkeys-js';

import { getCurrentState } from "common/state"
import * as element from "common/element"

// Handler
function openChatRoomSearch(event: KeyboardEvent, hotkeyEvent: HotkeysEvent) {
    let state = getCurrentState();
    if (state.isfocusOnChatMsgBox) {
        return;
    }

    element.chatRoomSearch().click();
    element.chatRoomSearchInputBox().click();
}

function escHandler(event: KeyboardEvent, hotkeyEvent: HotkeysEvent) {
    let state = getCurrentState();

    if (state.isfocusOnChatMsgBox) {
        element.chatMainMsgInputBox().blur();
    }
}

window.addEventListener("load", function (event) {
    // Register keyboard shortcut
    hotkeys('/', openChatRoomSearch);
    hotkeys('esc', escHandler);

    // whitelist filter
    var _oldFilter = hotkeys.filter;
    hotkeys.filter = function (event: KeyboardEvent) {
        let whitelist: EventTarget[] = [
            element.chatMainMsgInputBox(),
        ]
        if (whitelist.includes(event.target)) {
            return true;
        }
        return _oldFilter(event);
    }
})
