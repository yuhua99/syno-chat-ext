export const getStorage = (componentKey, callback) => {
    chrome.storage.sync.get([componentKey], function(result) {
        callback(componentKey, result[componentKey]);
    });
};

export const setStorage = (componentKey, value) => {
    chrome.storage.sync.set({ [componentKey]: value });
};
