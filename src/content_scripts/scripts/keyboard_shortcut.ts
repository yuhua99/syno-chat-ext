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

function moveBetweenChatRoom(event: KeyboardEvent, hotkeyEvent: HotkeysEvent) {
    let chatRooms = Array.from(document.querySelectorAll(".channel-list-item:not(.hidden)"));
    console.log("dsafasf")

    let idx = chatRooms.findIndex((e: Element) => e.classList.contains("x-view-selected"))
    if ((hotkeyEvent.key == "shift+left" && idx == 0) || (hotkeyEvent.key == "shift+right" && idx == chatRooms.length - 1)) {
        return;
    }
    console.log(hotkeyEvent.key, idx)
    if (hotkeyEvent.key == "shift+left") {
        (chatRooms[idx - 1] as HTMLElement).click();
    } else if (hotkeyEvent.key == "shift+right") {
        (chatRooms[idx + 1] as HTMLElement).click();
    }
    event.preventDefault();
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
    hotkeys('shift+left', moveBetweenChatRoom);
    hotkeys('shift+right', moveBetweenChatRoom);

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
