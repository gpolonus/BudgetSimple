
const dataId = 'budget-simple-data';

export default {
  get: () => localStorage.getItem(dataId),
  set: (value) => localStorage.setItem(dataId, value)
}
