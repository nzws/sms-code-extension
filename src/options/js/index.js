import { getLocalStorage, getSyncStorage } from '../../utils/promise-storage';

const restart = () => chrome.runtime.sendMessage('restart');

const submit = () => {
  chrome.storage.sync.set({
    pbKey: document.getElementById('api-token').value
  });
  console.log('updated');
  restart();
};

const main = async () => {
  const syncConfig = await getSyncStorage(['pbKey']);
  const localConfig = await getLocalStorage(['isRunning', 'statusCode']);

  const status = document.getElementById('status');
  status.innerText = localConfig?.isRunning
    ? 'Running'
    : 'Stopping' +
      (localConfig?.statusCode ? ` (${localConfig?.statusCode})` : '');
  status.style.color = localConfig?.isRunning ? 'green' : 'red';

  document.getElementById('api-token').value = syncConfig?.pbKey || '';

  document.getElementById('submit-button').addEventListener('click', submit);
  document.getElementById('restart-button').addEventListener('click', restart);

  chrome.runtime.onMessage.addListener(msg => msg === 'updateStatus' && main());
};

window.onload = () => main();
