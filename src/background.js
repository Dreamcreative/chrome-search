chrome.tabs.getAllInWindow(function (info) {
  // chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
  //   console.log(request);
  //   sendResponse('回复内容');
  // });
  console.log(11111, info);
  chrome.runtime.sendMessage(info, function () {
    return true;
  });
});
