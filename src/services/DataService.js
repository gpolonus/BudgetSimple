import onlineCheck from './OnlineCheckService';
import fb from './FirebaseService';
import ls from './LocalStorageService';

// use auth service here
const username = 'gpolonus';

export const saveData = (...args) => {
  return onlineCheck({
    on: () => saveFB(...args),
    off: () => saveLS(...args),
  });
}

export const fetchData = () => {
  return onlineCheck({
    on: () => fetchFB(),
    off: () => fetchLS(),
  });
}

const saveFB = (location, tag, amount, date) => {
  return new Promise((resolve) => {
    fb.set(`${username}/${tag}/${location}/${date}`, amount).then(resolve);
  });
}

const saveLS = (location, tag, amount, date) => {
  return new Promise(resolve => {
    const data = ls.get();
    data[tag][location][date] = amount;
    ls.set(data);
    resolve();
  });
}

const fetchFB = () => {
  return new Promise(resolve => {
    fb.ref(username).once('value', (data) => {
      resolve(data.toJSON());
    });
  });
}

const fetchLS = () => {
  return new Promise(resolve => {
    resolve(ls.get());
  });
}

