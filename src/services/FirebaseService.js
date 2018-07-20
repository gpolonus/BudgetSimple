import firebase from 'firebase';


const config = {
  databaseURL: process.env.REACT_APP_DATABASEURL,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  apiKey: process.env.REACT_APP_APIKEY
};

firebase.initializeApp(config);
const database = firebase.database();

export default {
  self: firebase,
  set(data) {
    return new Promise(resolve => {
      database.ref(this.uid).set(data, () => resolve(data));
    });
  },
  ref(ref) {
    console.log(ref);
    return database.ref(ref);
  },
  getUserDataRef() {
    if(this.uid) {
      return database.ref(this.uid);
    }
  }
};
