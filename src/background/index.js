import { getSyncStorage } from '../utils/promise-storage';
import { writeText } from '../utils/clipboard';

const codeRegex = /([0-9]{4,6}|[0-9]{2,3}-[0-9]{2,3})/im;
let ws;

const setRunning = status => {
  // chrome.pageAction.setBadgeText({ text: status ? 'OK' : 'X' });
  chrome.storage.local.set({
    isRunning: status
  });
  chrome.runtime.sendMessage('updateStatus');
};

const retry = () => {
  setRunning(false);

  setTimeout(() => {
    main();
  }, 1000 * 5);
};

const msg = ({ data }) => {
  if (!data) return;
  data = JSON.parse(data);
  console.log(data);
  if (
    data.type !== 'push' ||
    data.push.type !== 'sms_changed' ||
    !data.push?.notifications[0]
  )
    return;
  const smsData = data.push.notifications[0];
  if (!smsData) return;
  const code = smsData?.body.match(codeRegex);
  if (!code) return;
  console.log(code);

  writeText(code[0].split('-').join(''));
  chrome.notifications.create('', {
    title: `${smsData.title} - from SMS Code Extension`,
    message: smsData.body,
    type: 'basic',
    iconUrl: './assets/notification-icon.png'
  });
};

const main = async () => {
  console.log('main started');
  if (ws) {
    ws.close();
    ws = null;
  }
  const key = await getSyncStorage(['pbKey']);
  if (!key.pbKey) {
    setRunning(false);
    return;
  }

  ws = new WebSocket('wss://stream.pushbullet.com/websocket/' + key.pbKey);

  ws.onmessage = msg;
  ws.onclose = retry;
  ws.onopen = () => setRunning(true);
  ws.onerror = () => setRunning(false);
};

chrome.runtime.onMessage.addListener(msg => msg === 'restart' && main());
window.onload = main;
