// Listen for browser action click
chrome.action.onClicked.addListener((tab) => {
  // Execute the content script in the current tab
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
});