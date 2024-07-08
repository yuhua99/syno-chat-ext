interface PopupDiv extends HTMLDivElement {
    isPopupVisible: boolean;
}

// Function to create the popup div
function createPopupDiv(): PopupDiv {
    const popupDiv = document.createElement('div') as PopupDiv;
    popupDiv.classList.add('popup-div', 'x-menu', 'x-menu-floating', 'x-layer', 'emoji-menu', 'syno-plugin', 'syno-ux-menu', 'chat-menu', 'syno-plugin', 'with-icon', 'syno-ux-button-menu');
    popupDiv.style.position = 'fixed';
    popupDiv.style.zIndex = '15000';
    popupDiv.style.visibility = 'visible';
    popupDiv.style.width = '316px';
    popupDiv.style.height = '340px';
    popupDiv.style.left = '275px';
    const textareaWrap = document.querySelector('.chat-input-aria-main-v2') as HTMLElement;
    const referenceRect = textareaWrap.getBoundingClientRect();
    popupDiv.style.bottom = `${Math.round(referenceRect.height + 26)}px`;
    popupDiv.isPopupVisible = false;

    return popupDiv;
}

// Function to handle click outside of popup
function onClickOutside(event: MouseEvent, popupDiv: PopupDiv, imageBtn: HTMLSpanElement) {
    if (popupDiv.isPopupVisible && !popupDiv.contains(event.target as Node) && !imageBtn.contains(event.target as Node)) {
        document.body.removeChild(popupDiv);
        document.removeEventListener('click', (e) => onClickOutside(e, popupDiv, imageBtn));
        popupDiv.isPopupVisible = false;
    }
}

// Function to toggle popup visibility
function togglePopup(popupDiv: PopupDiv, imageBtn: HTMLSpanElement) {
    if (!popupDiv.isPopupVisible) {
        document.body.appendChild(popupDiv);
        document.addEventListener('click', (e) => onClickOutside(e, popupDiv, imageBtn));
    } else {
        document.body.removeChild(popupDiv);
        document.removeEventListener('click', (e) => onClickOutside(e, popupDiv, imageBtn));
    }
    popupDiv.isPopupVisible = !popupDiv.isPopupVisible;
}

// Mutation observer to append image button
const observer = new MutationObserver(function(mutationsList, observerInstance) {
    const buttonsDiv = document.querySelector('.msg-inputarea-buttons') as HTMLElement;
    if (buttonsDiv) {
        let imageBtn = buttonsDiv.querySelector('.msg-inputarea-emoji-btn')?.cloneNode(true) as HTMLSpanElement;
        imageBtn.id = 'meme';
        imageBtn.style.transform = 'rotate(180deg)';
        imageBtn.addEventListener('mouseenter', () => imageBtn.classList.add('x-btn-over'));
        imageBtn.addEventListener('mouseleave', () => imageBtn.classList.remove('x-btn-over'));
        const popupDiv = createPopupDiv();
        imageBtn.addEventListener('click', () => togglePopup(popupDiv, imageBtn));

        let scheduleBtn = buttonsDiv.querySelector('.msg-inputarea-schedule-btn') as HTMLSpanElement | null;
        if (scheduleBtn) {
            buttonsDiv.insertBefore(imageBtn, scheduleBtn.nextSibling);
        } else {
            buttonsDiv.appendChild(imageBtn);
        }

        observerInstance.disconnect();
    }
});

observer.observe(document, { childList: true, subtree: true });
