export const wait = (returnVal = {}, time = 500) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(returnVal);
  }, time);
});

export const formatAcc = (acc, sLen = 6, eLen = 4) => `${acc.substring(0, sLen)}...${acc.substr(acc.length - eLen)}`;
