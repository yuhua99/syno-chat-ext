const observer = new MutationObserver(function appendImageButton (mutations, mutationInstance) {
    const buttonsDiv = document.getElementsByClassName("msg-inputarea-buttons")[0] as HTMLSpanElement;
    if (buttonsDiv) {
        let imageBtn = buttonsDiv.getElementsByClassName('msg-inputarea-emoji-btn')[0].cloneNode(true) as HTMLSpanElement;
        imageBtn.id = 'meme';
        imageBtn.style.transform = 'rotate(180deg)';
        imageBtn.addEventListener('mouseenter', function() {
            imageBtn.classList.add('x-btn-over');
        });
        imageBtn.addEventListener('mouseleave', function() {
            imageBtn.classList.remove('x-btn-over');
        });
        let scheduleBtn = buttonsDiv.getElementsByClassName('msg-inputarea-schedule-btn')[0] as HTMLSpanElement;
        if (scheduleBtn) {
            buttonsDiv.insertBefore(imageBtn, scheduleBtn.nextSibling);
        } else {
            buttonsDiv.appendChild(imageBtn);
        }
        mutationInstance.disconnect();
    }
});

observer.observe(document, {
    childList: true,
    subtree:   true
});
