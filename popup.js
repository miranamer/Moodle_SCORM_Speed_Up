function getSavedTabId() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("savedTabId", function (result) {
      resolve(result.savedTabId);
    });
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  var addBorderButton125 = document.getElementById("runCode125");
  var addBorderButton15 = document.getElementById("runCode15");
  var addBorderButton2 = document.getElementById("runCode2");
  const tabId = await getSavedTabId();
  addBorderButton125.addEventListener("click", function () {
    chrome.scripting
        .executeScript({
          target: { tabId: tabId, allFrames: true },
          func: increasePlaybackSpeedFunc,
          args: [1.25]
        })
        .then(() => console.log("script injected in tabId", tabId));
  });

  addBorderButton15.addEventListener("click", function () {
    chrome.scripting
        .executeScript({
          target: { tabId: tabId, allFrames: true },
          func: increasePlaybackSpeedFunc,
          args: [1.5]
        })
        .then(() => console.log("script injected in tabId", tabId));
  });

  addBorderButton2.addEventListener("click", function () {
    chrome.scripting
        .executeScript({
          target: { tabId: tabId, allFrames: true },
          func: increasePlaybackSpeedFunc,
          args: [2]
        })
        .then(() => console.log("script injected in tabId", tabId));
  });
});

const increasePlaybackSpeedFunc = (speed) => {
  console.log(document);
  for (let i = 0; i < document.querySelectorAll("video").length; i++) {
    if (document.querySelectorAll("video")[i].src.includes(".php")) {
      console.log("Y", document.querySelectorAll("video")[i]);
      document.querySelectorAll("video")[i].playbackRate = speed;
    }
  }
};
