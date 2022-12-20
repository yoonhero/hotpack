import copy from "copy-to-clipboard";

const handleCopyClipBoard = async (text) => {
    try {
        // await navigator.clipboard.writeText(text);
        copy(text);
    } catch (e) {
        console.log(e);
    }
};

export { handleCopyClipBoard };
