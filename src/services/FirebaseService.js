import firebase from 'firebase';

let uid = 'garbage';

const config = {
  databaseURL: process.env.REACT_APP_DATABASEURL,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  apiKey: process.env.REACT_APP_APIKEY
};

firebase.initializeApp(config);
const database = firebase.database();

export default {
  self: firebase,
  setUid: _uid => uid = _uid,
  set(data) {
    return new Promise(resolve => {
      database.ref(uid).set(data, () => resolve(data));
    });
  },
  ref(ref) {
    console.log(ref);
    return database.ref(ref);
  },
  getUserDataRef() {
    if(uid) {
      return database.ref(uid);
    }
  }
};
