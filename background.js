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
    // no need to use title and local storage to keep state. should use local storage as definitive
    // `on` and then set title based that.
    chrome.storage.local.set({ krassensteinVisionOn: nextOn }, () => {
      chrome.browserAction.setTitle({ title: nextOn ? TITLE_ON : TITLE_OFF }, () => {
        chrome.browserAction.setIcon({
          path: {
            16: buildIconPath(nextOn, 16),
            48: buildIconPath(nextOn, 48),
            128: buildIconPath(nextOn, 128)
          }
        });
        if (!nextOn) {
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                chrome.tabs.sendMessage(tabs[0].id, { action: "TURNED_OFF" })
            });
        }
      });
    });
  });
});
