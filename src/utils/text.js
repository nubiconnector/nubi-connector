import { toast } from "react-toastify";

export const updateDecimalLength = (value, max) => {
    const [a, b] = value.toString().split(".");

    return a + (b ? "." + b.slice(0, max) : "");
};

export const uppercaseFirstLetter = (text) =>
    text.slice(0, 1).toUpperCase() + text.slice(1, text.length);

export const catWalletAddr = (addr, maxLen = 20) =>
    addr.length > maxLen ? `${addr.slice(0, maxLen)}..` : addr;

export const copyTextToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);

    toast.info("Copied!");
};
