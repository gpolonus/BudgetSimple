import onlineCheckRun from './OnlineCheckService';
import fb from './FirebaseService';
import ls from './LocalStorageService';


export const constructData = (data, location, tag, amount, date) => {
  return {
    ...data,
    '_updated': date,
    [tag]: {
      ...(data[tag] || []),
      [location]: {
        ...(data[tag] ? data[tag][location] || [] : []),
        [date]: amount
      }
    }
  };
}

export const saveData = (data, ...args) => {
  let newData = data;
  if(args) {
    newData = constructData(data, ...args);
  }
  return onlineCheckRun({
    on: () => {
      saveLS(newData)
      return saveFB(newData);
    },
    off: () => saveLS(newData),
  });
}

export const fetchAndSaveNewestData = () => {
  return onlineCheckRun({
    on: () => {
      return new Promise(resolve => {
        fetchFB().then(onData =>
          fetchLS().then(offData => {
            resolve(saveNewest(onData, offData));
          })
        );
      });
    },
    off: () => fetchLS(),
  });
}

export const saveNewest = (onData, offData = ls.get()) => {
  if(!offData && onData) {
    return saveLS(onData);
  } else if (!onData && offData) {
    return saveFB(offData);
  } else if(!onData && !offData) {
    return {};
  } else {
    const newestOnDate = onData._updated || 0;
    const newestOffDate = offData._updated || 0;
    if(newestOnDate < newestOffDate) {
      return saveFB(offData);
    } else if (newestOnDate > newestOffDate) {
      return saveLS(onData);
    } else {
      return Promise.resolve(onData);
    }
  }
}

const saveFB = (data) => {
  return fb.set(data);
}

const saveLS = (data) => {
  return new Promise(resolve => {
    ls.set(data);
    resolve(data)
  });
}

const fetchFB = () => {
  return new Promise(resolve => {
    fb.getUserDataRef().once('value', (data) => {
      resolve(data.toJSON());
    });
  });
}

const fetchLS = () => {
  return new Promise(resolve => {
    resolve(ls.get());
  });
}

