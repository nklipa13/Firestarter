import moment from 'moment/moment';

export const wait = (returnVal = {}, time = 500) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(returnVal);
  }, time);
});

export const formatAcc = (acc, sLen = 6, eLen = 4) => `${acc.substring(0, sLen)}...${acc.substr(acc.length - eLen)}`;

export const notGraterThan = (val, max) => {
  if (val > max) return max;

  return val;
};

export const imageExists = url => new Promise((resolve, reject) => {
  const img = new Image();
  img.onload = () => { resolve(); };
  img.onerror = () => { reject(); };
  img.src = url;
});

export const calcDaysPassed = (val) => {
  const currDate = moment(new Date());
  const dateToTest = moment(val);

  return currDate.diff(dateToTest, 'days');
};
