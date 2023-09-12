chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // Forward the user information from the content script to the popup.
    console.log("__content____companyInformation__222_____", message)
    
    chrome.action.setPopup({ tabId: sender.tab.id, popup: "popup.html" });
    sendResponse(message);
  });
  