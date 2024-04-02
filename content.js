chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'addRedBorderToDivs') {
      // Select all div elements and add red border

      //! PUT WHAT YOU WANT HERE TO MANIPULATE ACTUAL CURR TAB'S DOM
      
      //? This works for sure on current tabs DOM
      //document.querySelectorAll('div').forEach(function(div) {
        //div.style.border = '2px solid red';
      //});

      console.log(document.querySelectorAll("video"));
      for(let i = 0; i < document.querySelectorAll("video").length; i++){
        if(document.querySelectorAll("video")[i].src.includes(".php")){
            console.log('Y', document.querySelectorAll("video")[i]);
            document.querySelectorAll("video")[i].playbackRate = 2;
        }
      }


    }
  });