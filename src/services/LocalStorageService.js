
const username = process.env.REACT_APP_USERNAME;
const dataId = `budget-simple-data-${username}`;

export default {
  get: () => JSON.parse(localStorage.getItem(dataId)),
  set: (value) => localStorage.setItem(dataId, JSON.stringify(value))
}
