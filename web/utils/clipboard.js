const handleCopyClipBoard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
    } catch (e) {
        console.log(e);
    }
};

export { handleCopyClipBoard };
