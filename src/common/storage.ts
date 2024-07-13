export const getStorage = async (componentKey: string) => {
    const value = await chrome.storage.sync.get(componentKey).then((result) => {
        return result[componentKey];
    });
    return value;
};

export const setStorage = async (componentKey: string, value: any) => {
    await chrome.storage.sync.set({ [componentKey]: value }).then(() => {
        console.log(componentKey, "is set to", value);
    });
};
