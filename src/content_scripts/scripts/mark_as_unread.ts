interface ContextMenu extends HTMLDivElement {
    isVisible: boolean;
    targetChannel: HTMLSpanElement;
}

function createMarkUnreadItem(){

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
}

function clickChannel(event: MouseEvent, contextMenu: ContextMenu) {
    const target = event.target as HTMLElement;
    if (event.button === 0 && contextMenu.isVisible){
        if (contextMenu.contains(target)) {
            markChannelUnread(contextMenu.targetChannel);
        }
        document.body.removeChild(contextMenu);
        contextMenu.isVisible = false;
    } else if (event.button === 0 && target.classList.contains('msg-add-action-btn')) { 
        const moreMenu = document.querySelector('.hover-action-more-menu');
        const ul = moreMenu?.querySelector('.x-menu-list');
        if (ul && !ul.querySelector('#mark-as-unread')) {
            ul.appendChild(createMarkUnreadItem());
        }
    } else if (event.button === 0 && target.id === "mark-as-unread") {
        const currChannel = document.querySelector('.channel-list-item.x-view-selected') as HTMLElement;
        // TODO: count the text-wrapper
        markChannelUnread(currChannel, 10);
    } else if (event.button === 2) {
        event.preventDefault();
        if (target.classList.contains('channel-list-item') || target.closest('.channel-list-item')) {
            if (target.classList.contains('channel-list-item')) {
                contextMenu.targetChannel = target;
            }
            else {
                contextMenu.targetChannel = target.closest('.channel-list-item') as HTMLElement;
            }
            contextMenu.style.top = `${event.clientY}px`;
            contextMenu.style.left = `${event.clientX}px`;
            document.body.appendChild(contextMenu);
            contextMenu.isVisible = true;
        }
    }
};


const observer_channel = new MutationObserver(function(mutationsList, observerInstance) {
    const channelList = document.querySelectorAll('.channel-list-item');
    if (channelList.length > 0) {
        const contextMenu = createContextMenu();
        document.addEventListener('mousedown', (e) => clickChannel(e, contextMenu));
        observerInstance.disconnect();
    }
});

observer_channel.observe(document, { childList: true, subtree: true });
