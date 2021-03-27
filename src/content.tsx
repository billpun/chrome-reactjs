import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import {
    EuiHeader,
    EuiHeaderSections,
    EuiText
} from '@elastic/eui';
import "./content.scss";
import { MessageTypes } from "./types";

const body = document.getElementsByTagName("body");
console.log("body:", body);

chrome.runtime.sendMessage({ type: "REQ_STATUS" });

const sections = [
    {
        items: [<EuiText style={{ padding: 20 }}>Hello World</EuiText>],
        borders: 'right',
    },
] as EuiHeaderSections[];

class Main extends React.Component {
    render() {
        return (
            <Frame head={[
                <link type="text/css" rel="stylesheet" href={
                    chrome.runtime.getURL("static/css/content.css")
                } ></link>,
            ]}>
                <FrameContextConsumer>
                    {
                        ({ }) => {
                            // Render Children
                            return (
                                <div className={'my-extension'}>
                                    <EuiHeader position='fixed' sections={sections} />
                                </div>
                            )
                        }
                    }
                </FrameContextConsumer>
            </Frame>
        )
    }
}

const app = document.createElement('div');
app.id = "my-extension-root";

chrome.runtime.onMessage.addListener((message: MessageTypes) => {
    switch (message.type) {
        case "STATUS":
            if (message.enable) {
                body[0]?.prepend(app);
                ReactDOM.render(<Main />, app);
            } else {
                app.parentNode?.removeChild(app);
            }
            break;
        default:
            break;
    }
});