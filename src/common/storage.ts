export const getStorage = async (
    componentKey: string
) => {
    let data = await chrome.storage.sync.get(componentKey)
    return data[componentKey]
};

export const setStorage = async (componentKey: string, value: any) => {
    await chrome.storage.sync.set({ componentKey: value });
};
