import firebase from 'firebase';


const config = {
  databaseURL: "https://budget-simple.firebaseio.com/",
};

firebase.initializeApp(config);

export default {
  database: firebase.database(),
  set(ref, data) {
    return new Promise(resolve => {
      this.database.ref(ref).set(data, () => resolve(data));
    });
  },
  ref(ref) {
    return this.database.ref(ref);
  }
};
