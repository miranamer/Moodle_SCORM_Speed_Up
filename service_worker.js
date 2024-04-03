function saveTabId(tabId) {
  chrome.storage.local.set({ savedTabId: tabId });
}

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
  // Check if savedTabId exists in local storage

  chrome.storage.local.get(null, function (data) {
    if (chrome.runtime.lastError) {
      console.error(
        "Error retrieving data from local storage:",
        chrome.runtime.lastError.message
      );
    } else {
      console.log("Data in local storage before removal:", data);
    }
  });

  chrome.storage.local.get("savedTabId", function (data) {
    if (chrome.runtime.lastError) {
      console.error(
        "Error retrieving savedTabId from local storage:",
        chrome.runtime.lastError.message
      );
    } else {
      if ("savedTabId" in data) {
        // savedTabId exists, remove it
        chrome.storage.local.remove("savedTabId", function () {
          if (chrome.runtime.lastError) {
            console.error(
              "Error removing savedTabId from local storage:",
              chrome.runtime.lastError.message
            );
          } else {
            console.log("savedTabId removed from local storage.");
          }
        });
      } else {
        console.log("savedTabId not found in local storage, no action taken.");
      }
    }
  });
});

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
