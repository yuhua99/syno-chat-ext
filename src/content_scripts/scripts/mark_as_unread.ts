interface ContextMenu extends HTMLDivElement {
    isVisible: boolean;
    targetChannel: HTMLSpanElement;
}

function createContextMenu(): ContextMenu {
    const contextMenu = document.createElement('div') as ContextMenu;
    contextMenu.className = 'custom-context-menu';
    contextMenu.classList.add('x-menu', 'x-menu-floating', 'x-layer', 'syno-ux-menu', 'chat-menu', 'no-icon', 'syno-ux-button-menu');
    contextMenu.innerHTML = '<ul class="x-menu-list"><span class="x-menu-item-text">mark as unread</span></ul>';
    contextMenu.style.position = 'fixed';
    contextMenu.style.zIndex = '30000';
    contextMenu.style.visibility = 'visible';
    contextMenu.isVisible = false;

    contextMenu.addEventListener('mouseover', () => {
        contextMenu.style.background = "#f0f0f0";
    });

    contextMenu.addEventListener('mouseout', () => {
        contextMenu.style.background = "#ffffff";
    });

    return contextMenu;
};

function clickChannel(event: MouseEvent, contextMenu: ContextMenu) {
    if (event.button === 0 && contextMenu.isVisible){
        if (contextMenu.contains(event.target as Node)) {
            const channelItem = contextMenu.targetChannel;
            const unreadElement = channelItem.querySelector('.unread.number-0');
            if (unreadElement) {
                unreadElement.classList.remove('number-0');
            }
            const hideButton = channelItem.querySelector('.hide-channel-btn');
            if (hideButton) {
                hideButton.remove();
            }
        }
        document.body.removeChild(contextMenu);
        contextMenu.isVisible = false;
    } else if (event.button === 2) {
        event.preventDefault();
        const target = event.target as HTMLElement;
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
