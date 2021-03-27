import * as React from "react";
import { MessageTypes } from "../../types";
import "./Button.css";
import {
    EuiButtonIcon
} from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.css';

export const Button = () => {

    const [enable, setEnable] = React.useState(true);

    React.useEffect(() => {

        // ask background to return status
        chrome.runtime.sendMessage({ type: "REQ_STATUS" });

        // set status
        chrome.runtime.onMessage.addListener((message: MessageTypes) => {
            switch (message.type) {
                case "STATUS":
                    setEnable(message.enable)
                    break;
                default:
                    break;
            }
        });
    }, []);

    return (
        <EuiButtonIcon
            aria-label={enable ? 'play' : 'pause'}
            iconType={enable ? 'play' : 'pause'}
            onClick={() => {
                chrome.runtime.sendMessage({ type: "TOGGLE", enable: !enable });
                setEnable(!enable)
            }}
        />
    );
};
