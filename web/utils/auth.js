import { getStorageItem, setStorageItem } from "./storage_utils";

const JWT_TOKEN = "JWT_TOKEN";

const setAuthKey = (token) => {
    setStorageItem(JWT_TOKEN, token);
};

const getAuthKey = () => {
    return getStorageItem(JWT_TOKEN);
};

const getAuthHeader = () => {
    const authKey = getAuthKey();

    const headers = {
        Authorization: authKey,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    };

    return headers;
};

export { setAuthKey, getAuthKey, getAuthHeader };
