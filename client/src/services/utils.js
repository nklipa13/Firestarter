export const wait = (returnVal = {}, time = 1000) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(returnVal);
  }, time);
});
