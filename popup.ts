export const sendMessage = function (info = "") {}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(11111, request, sender)
})
