# A Comprehensive Chrome Extension Example with Reactjs and ElasticUI

1. git clone this repo
2. cd into this repo
3. run `yarn install`
4. run `yarn build`
5. open Chrome.
6. navigate to `chrome://extensions`.
7. enable _Developer mode_.
8. click _Load unpacked_.
9. select the `dist` directory.

This example shows you how you can
1. Use ReactJS to build the popup html.
2. Enable communications between popup, content script, and background script.
3. Utilize these communications to inject HTML elements to the current active tab on the fly triggered by a button in the popup page. 
4. Write an HTML page using ReactJS and inject it in the content script.
5. Use iFrame to prevent the styles on the injected page from being corrupted by the styles on the current active tab.
6. Apply Elastic UI to build chrome extensions.
