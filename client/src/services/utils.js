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

export const toDecimal = (num, decimals = 3) => {
  const conditional = num.indexOf('.') !== -1;

  return conditional ? +num.substr(0, num.indexOf('.') + decimals + 1) : num;
};

export const calcDaysPassed = (val) => {
  const currDate = moment(new Date());
  const dateToTest = moment(val);

  return currDate.diff(dateToTest, 'days');
};

const countDecimals = (value) => {
  if (Math.floor(value) !== value) return value.toString().split('.')[1].length || 0;
  return 0;
};

export const formatNumber = (_num, fixed) => {
  try {
    let num = _num;

    if (typeof num === 'object') num = num.toNumber();

    if (Number.isInteger(num)) return num;

    const decimals = countDecimals(num);
    const numString = num.toString();

    const formated = numString.substring(0, (numString.length - decimals) + fixed);

    if (formated === 'Infinity') return '0';

    return parseFloat(_num).toFixed(fixed);
  } catch (err) {
    return parseFloat(_num).toFixed(fixed);
  }
};
