import { getStorage, setStorage } from "common/storage";
import { UNREAD_CHANNEL_LIST } from "common/settings";

let ChannelList = [] as string[];
let SelectedChannel: HTMLElement | null = null;

function createMarkUnreadItemForMenu() {
    const newItem = document.createElement('div');
    newItem.className = 'v-menu-item';
    newItem.setAttribute('role', 'menuitem');
    newItem.setAttribute('tabindex', '0');

    const span = document.createElement('span');
    span.className = 'title';
    span.textContent = 'Mark as Unread';

    newItem.appendChild(span);

    newItem.addEventListener('mouseenter', () => newItem.classList.add('active'));
    newItem.addEventListener('mouseleave', () => newItem.classList.remove('active'));

    newItem.addEventListener('click', () => {
        if (SelectedChannel) {
            markChannelUnread(SelectedChannel);
        }
        const menu = newItem.closest('.v-menu');
        if (menu) menu.remove();
    });
    return newItem;
}

function insertMarkUnreadOnMenu() {
    const menus = document.querySelectorAll('.v-menu .v-trap-focus-body');
    menus.forEach(menuBody => {
        const markUnreadItem = createMarkUnreadItemForMenu();
        menuBody.insertBefore(markUnreadItem, menuBody.firstChild);
    });
}


function markChannelUnread(channelItem: HTMLElement, unreadNumber: number = 1) {
    if (!channelItem) return;

    const hideAction = channelItem.querySelector('.hide-on-hover-action');
    if (!hideAction) return;
    // If hideAction is not empty, it may already be marked as unread or already contain unread messages.
    if (hideAction.children.length !== 0) return;

    if (unreadNumber > 0) {
        const unreadDiv = document.createElement('div');
        unreadDiv.className = 'unread-indicator border-radius-full caption-s weight-enhanced min-w-5 items-center justify-center bg-bg-fill-theme-thick px-[6px] text-center text-fg-on-fill-error-thick';
        unreadDiv.textContent = unreadNumber.toString();
        hideAction.appendChild(unreadDiv);
    }

    if(!ChannelList.includes(channelItem.id)){
        ChannelList.push(channelItem.id);
        setStorage(UNREAD_CHANNEL_LIST, ChannelList);
    }
};

function clearChannelUnread(channelItem: HTMLElement) {
    if (!channelItem) return;
    ChannelList = ChannelList.filter(id => id !== channelItem.id);
    setStorage(UNREAD_CHANNEL_LIST, ChannelList);

    const hideAction = channelItem.querySelector('.hide-on-hover-action');
    if (!hideAction) return;
    const unreadDiv = hideAction.querySelector('.unread-indicator');
    if (unreadDiv) {
        hideAction.removeChild(unreadDiv);
    }
}

const observer_channel = new MutationObserver(async function(mutationsList, observerInstance) {
    const channelAll = document.querySelectorAll<HTMLElement>('.module-item-wrapper.module-item-option-wrapper:not(.hidden)');
    if (channelAll.length > 0) {
        ChannelList = await getStorage(UNREAD_CHANNEL_LIST) || [] as string[];
        channelAll.forEach(channel => {
            const channelId = channel.id; 
            if (ChannelList.includes(channelId)) {
                markChannelUnread(channel as HTMLElement);
            }
            if (!channel.dataset.clickBound) {
                channel.dataset.clickBound = 'true'; // 避免重複綁定
                channel.addEventListener('click', () => {
                    clearChannelUnread(channel as HTMLElement);
                });
            }

            // Find the 'More options' button and bind click event
            const moreBtn = channel.querySelector('.show-on-hover-action button') as HTMLButtonElement | null;
            if (moreBtn && !moreBtn.dataset.bound) {
                moreBtn.dataset.bound = 'true'; // Avoid rebinding
                moreBtn.addEventListener('click', () => {
                    SelectedChannel = channel as HTMLElement;
                    insertMarkUnreadOnMenu();
                });
            }
        });
        observerInstance.disconnect();
    }
});

observer_channel.observe(document, { childList: true, subtree: true });
