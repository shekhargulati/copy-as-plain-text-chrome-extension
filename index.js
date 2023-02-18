chrome.contextMenus.create({
  "id":"copyAsPlainText",
  "title": "Copy as Plain Text",
  "contexts": ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(itemData){
  copyToClipboard(itemData.selectionText);
});

chrome.commands.onCommand.addListener(function(command){
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      chrome.tabs.executeScript(tabs[0].id, { code: 'document.getSelection().toString()'}, (result) => {
         copyToClipboard(result);
      });
  });
});

const copyToClipboard = str => {
  console.log("copyToClipboard");
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};
