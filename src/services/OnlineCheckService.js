
/**
 * determine whether or not we are online
 * then either call the arguments with the
 * passed in callback or store the arguments
 * in local storage to be passed into the callback
 * when youre back online later
 */

export default (funcs) => {
  if (isOnline()) {
    return funcs.on();
  } else {
    return funcs.off();
  }
}

export const isOnline = () => navigator.onLine;
