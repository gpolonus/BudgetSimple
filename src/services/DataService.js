import onlineCheck from './OnlineCheckService';
import fb from './FirebaseService';

// use auth service here
const username = 'gpolonus';

export const save = (location, tag, amount, date) => {
  return new Promise((resolve) => {
    fb.set(`${username}/${tag}/${location}/${date}`, amount).then(resolve);
  });
}

export const fetchData = () => {
  return new Promise(resolve => {
    fb.ref(username).once('value', (data) => {
      resolve(data.toJSON());
    });
  });
}

