function saveTabId(tabId) {
  chrome.storage.local.set({ savedTabId: tabId });
}

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (details.url.endsWith("index_lms.html")) {
      saveTabId(details.tabId);
      chrome.scripting
        .executeScript({
          target: { tabId: details.tabId, allFrames: true },
          func: increasePlaybackSpeedFunc,
        })
        .then(() => console.log("script injected in all URL", details));
    }
  },
  { urls: ["<all_urls>"] }
);

const increasePlaybackSpeedFunc = () => {
  console.log(document);
  for (let i = 0; i < document.querySelectorAll("video").length; i++) {
    if (document.querySelectorAll("video")[i].src.includes(".php")) {
      console.log("Y", document.querySelectorAll("video")[i]);
      document.querySelectorAll("video")[i].playbackRate = 2;
    }
  }
};
