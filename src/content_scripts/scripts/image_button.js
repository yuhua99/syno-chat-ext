const observer = new MutationObserver(function appendImageButton (mutations, mutationInstance) {
    const buttonsDiv = document.getElementById("ext-comp-1204");
    if (buttonsDiv) {
        const imageBtn = buttonsDiv.getElementsByClassName('msg-inputarea-emoji-btn')[0].cloneNode(true);
        imageBtn.id = 'meme';
        imageBtn.style.transform = 'rotate(180deg)';
        imageBtn.addEventListener('mouseenter', function() {
            imageBtn.classList.add('x-btn-over');
        });
        imageBtn.addEventListener('mouseleave', function() {
            imageBtn.classList.remove('x-btn-over');
        });
        const scheduleBtn = buttonsDiv.getElementsByClassName('msg-inputarea-schedule-btn')[0];
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
