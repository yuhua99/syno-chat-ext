import { getStorage, setStorage } from "common/storage";
import { UNREAD_CHANNEL_LIST } from "common/settings";

interface ContextMenu extends HTMLDivElement {
    isVisible: boolean;
    targetChannel: HTMLSpanElement;
}

let channelList = [] as string[];
const contextMenu = createContextMenu();

function createMarkUnreadItem() {
    const newUnreadItem = document.createElement('a');
    newUnreadItem.className = 'x-menu-list-item';
    newUnreadItem.setAttribute('hidefocus', 'true');
    newUnreadItem.setAttribute('unselectable', 'on');
    newUnreadItem.setAttribute('href', '#');
    newUnreadItem.setAttribute('role', 'menuitem');

    const newDiv = document.createElement('div');
    newDiv.className = 'x-menu-item x-unselectable';

    const newSpan = document.createElement('span');
    newSpan.setAttribute('id', 'mark-as-unread');
    newSpan.className = 'x-menu-item-text';
    newSpan.textContent = 'Mark as Unread';

    newDiv.appendChild(newSpan);
    newUnreadItem.appendChild(newDiv);

    newUnreadItem.addEventListener('mouseover', () => {
        newUnreadItem.classList.add("x-menu-item-active");
    });

    newUnreadItem.addEventListener('mouseout', () => {
        newUnreadItem.classList.remove('x-menu-item-active');
    });

    return newUnreadItem;
};

function createContextMenu(): ContextMenu {
    const contextMenu = document.createElement('div') as ContextMenu;
    contextMenu.appendChild(createMarkUnreadItem());
    contextMenu.classList.add('x-menu', 'x-menu-floating', 'x-layer', 'syno-ux-menu', 'chat-menu', 'no-icon', 'syno-ux-button-menu');
    contextMenu.style.cssText += 'padding: 0px !important;';
    contextMenu.style.position = 'fixed';
    contextMenu.style.zIndex = '15000';
    contextMenu.style.visibility = 'visible';
    contextMenu.isVisible = false;
    return contextMenu;
};

function createMarkUnreadInMsgAction () {
    const moreMenu = document.querySelector('.hover-action-more-menu');
    const ul = moreMenu?.querySelector('.x-menu-list');
    if (ul && !ul.querySelector('#mark-as-unread')) {
        ul.appendChild(createMarkUnreadItem());
    }
};

function markChannelUnread(channelItem: HTMLElement, unreadNumber: number = 1) {
    if (!channelItem) return;
    const unreadElement = channelItem.querySelector('.unread.number-0');
    if (unreadElement && unreadNumber === 1) {
        unreadElement.classList.remove('number-0');
    }
    else if (unreadElement && unreadNumber > 1) {
        unreadElement.classList.remove('number-0');
        unreadElement.classList.add(`number-${unreadNumber}`);
    }
    const hideButton = channelItem.querySelector('.hide-channel-btn');
    if (hideButton) {
        hideButton.remove();
    }

    const channelName = channelItem.querySelector('.name').innerHTML;
    if(!channelList.includes(channelName)){
        channelList.push(channelName);
        setStorage(UNREAD_CHANNEL_LIST, channelList);
    }
};

function clickChannel(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (event.button === 0) {
        if (contextMenu.isVisible) {
            if (contextMenu.contains(target)) {
                markChannelUnread(contextMenu.targetChannel);   
            }
            document.body.removeChild(contextMenu);
            contextMenu.isVisible = false;
        } else if (target.classList.contains('msg-add-action-btn')) {
            createMarkUnreadInMsgAction();
        } else if (target.id === "mark-as-unread" && target.closest('.hover-action-more-menu')) {
            const currChannel = document.querySelector('.channel-list-item.x-view-selected') as HTMLElement;
            // TODO: count the text-wrapper
            markChannelUnread(currChannel, 10);
        }
        else if (target.classList.contains('channel-list-item') || target.closest('.channel-list-item')) {
            const channelItem = target.closest('.channel-list-item') as HTMLElement;
            const channelName = channelItem.querySelector('.name').innerHTML;
            const channelIndex = channelList.indexOf(channelName);
            if (channelIndex !== -1) {
                channelList.splice(channelIndex, 1);
                setStorage(UNREAD_CHANNEL_LIST, channelList);
            }
        }
    } else if (event.button === 2) {
        if (target.classList.contains('channel-list-item') || target.closest('.channel-list-item')) {
            contextMenu.targetChannel = target.closest('.channel-list-item') as HTMLElement;
            contextMenu.style.top = `${event.clientY}px`;
            contextMenu.style.left = `${event.clientX}px`;
            document.body.appendChild(contextMenu);
            contextMenu.isVisible = true;
        }
    }
};


const observer_channel = new MutationObserver(async function(mutationsList, observerInstance) {
    const channelAll = document.querySelectorAll('.channel-list-item');
    if (channelAll.length > 0) {
        channelList = await getStorage(UNREAD_CHANNEL_LIST) || [] as string[];
        channelAll.forEach(channel => {
            if (channel.classList.contains('hidden')) return;
            const channelName = channel.querySelector('.name');
            const name = channelName.innerHTML;
            if (channelList.includes(name)){
                markChannelUnread(channel as HTMLElement);
            }
        });
        document.addEventListener('mousedown', (e) => clickChannel(e));
        observerInstance.disconnect();
    }
});

observer_channel.observe(document, { childList: true, subtree: true });
