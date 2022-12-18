const setStorageItem = (key, value) => {
    const jsoned_value = JSON.stringify(value);
    localStorage.setItem(key, jsoned_value);
};

const getStorageItem = (key) => {
    const saved = localStorage.getItem(key);
    try {
        const initialValue = JSON.parse(saved);
        return initialValue || undefined;
    } catch (e) {
        return undefined;
    }
};

const deleteStorageItem = (key) => {
    localStorage.removeItem(key);
};

export { setStorageItem, getStorageItem, deleteStorageItem };
