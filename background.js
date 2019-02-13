const TITLE_ON = "Krassenstein Vision! (On)";
const TITLE_OFF = "Krassenstein Vision! (Off)";

function buildIconPath(on, resolution) {
  return `assets/krassenstein-vision-icon-${on ? "on" : "off"}-${resolution}.png`;
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.browserAction.setTitle({ title: TITLE_ON }, () => {
      chrome.storage.local.set({ krassensteinVisionOn: true });
  });
});

chrome.browserAction.onClicked.addListener(() => {
  chrome.browserAction.getTitle({}, currentTitle => {
    const isOn = currentTitle !== TITLE_OFF;
    const nextOn = !isOn;
    chrome.storage.local.set({ krassensteinVisionOn: nextOn }, () => {
      chrome.browserAction.setTitle({ title: nextOn ? TITLE_ON : TITLE_OFF }, () => {
        chrome.browserAction.setIcon({
          path: {
            16: buildIconPath(nextOn, 16),
            48: buildIconPath(nextOn, 48),
            128: buildIconPath(nextOn, 128)
          }
        });
      });
    });
  });
});
