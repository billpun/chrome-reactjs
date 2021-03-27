import { MessageTypes } from "./types";

const sendStatus = (enable: boolean) => {

    const message = { type: "STATUS", enable };

    // send message to popup
    chrome.runtime.sendMessage(message);

    // send message to every active tab
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            if (tab.id) {
                chrome.tabs.sendMessage(tab.id, message);
            }
        });
    });
};

let enable = false;

// Get locally stored value
chrome.storage.local.get("enable", (res) => {
    if (res["enable"]) {
        enable = true;
    } else {
        enable = false;
    }
});

chrome.runtime.onMessage.addListener((message: MessageTypes) => {

    console.log('receiveStatus:', message)

    switch (message.type) {
        case "REQ_STATUS":
            sendStatus(enable);
            break;
        case "TOGGLE":
            enable = message.enable;
            chrome.storage.local.set({ enable: enable });
            sendStatus(enable);
            break;
        default:
            break;
    }
});
