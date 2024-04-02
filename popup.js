document.addEventListener('DOMContentLoaded', function() {
    var addBorderButton = document.getElementById('runCode');
    addBorderButton.addEventListener('click', function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: 'addRedBorderToDivs' }
        );
      });
    });
  });
  