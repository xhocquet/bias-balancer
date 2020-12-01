// eslint-disable-next-line import/no-unassigned-import
import './options-storage';

browser.runtime.onMessage.addListener(notify);

function notify(message) {
  chrome.browserAction.setIcon({path : message.iconPath});
}


