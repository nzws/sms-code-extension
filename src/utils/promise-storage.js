export const getSyncStorage = keys =>
  new Promise(resolve => {
    chrome.storage.sync.get(keys, result => {
      resolve(result);
    });
  });

export const getLocalStorage = keys =>
  new Promise(resolve => {
    chrome.storage.local.get(keys, result => {
      resolve(result);
    });
  });
