function getSavedTabId() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("savedTabId", function (result) {
      resolve(result.savedTabId);
    });
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  var addBorderButton = document.getElementById("runCode");
  const tabId = await getSavedTabId();
  addBorderButton.addEventListener("click", function () {
    chrome.scripting
        .executeScript({
          target: { tabId: tabId, allFrames: true },
          func: increasePlaybackSpeedFunc,
        })
        .then(() => console.log("script injected in tabId", tabId));
  });
});

const increasePlaybackSpeedFunc = () => {
  console.log(document);
  for (let i = 0; i < document.querySelectorAll("video").length; i++) {
    if (document.querySelectorAll("video")[i].src.includes(".php")) {
      console.log("Y", document.querySelectorAll("video")[i]);
      document.querySelectorAll("video")[i].playbackRate = 2;
    }
  }
};
