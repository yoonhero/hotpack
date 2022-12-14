const setStorageItem = (key, value) => {
    jsoned_value = JSON.stringify(value);
    localStorage.setItem(key, jsoned_value);
};

const getStorageItem = (key) => {
    const saved = localStorage.getItem(key);
    const initialValue = JSON.parse(saved);
    return initialValue || undefined;
};

export { setStorageItem, getStorageItem };
