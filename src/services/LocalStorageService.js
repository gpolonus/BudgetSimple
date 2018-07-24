
let dataId = 'budget-simple-data-';

export default {
  setUid: uid => dataId += uid,
  get: () => JSON.parse(localStorage.getItem(dataId)),
  set: (value) => localStorage.setItem(dataId, JSON.stringify(value))
}
