chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "increasePlaybackSpeed") {
    increasePlaybackSpeedFunc();
  }
});

const increasePlaybackSpeedFunc = () => {
  for (let i = 0; i < document.querySelectorAll("video").length; i++) {
    if (document.querySelectorAll("video")[i].src.includes(".php")) {
      console.log("Y", document.querySelectorAll("video")[i]);
      document.querySelectorAll("video")[i].playbackRate = 2;
    }
  }
};

const myCallback = () => {
  console.log("clicked!");
};

const scormForm = document.getElementById("scormviewform");
scormForm.replaceWith(scormForm.cloneNode(true));
