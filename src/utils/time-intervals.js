const charToSeconds = {
  m: 60,
  h: 60 * 60,
  d: 60 * 60 * 24,
  w: 60 * 60 * 24 * 7,
  mo: 60 * 60 * 24 * 30,
  y: 60 * 60 * 24 * 365,
};

export const intervalToSeconds = (delay) => {
  const regexp = new RegExp(/^[1-9]{1}\d? ?[(m|h|d|w|mo|y)]{1}$/m);
  if (!delay || !regexp.test(delay)) throw new Error(`Invalid delay: ["${delay}"]`);
  const interval = delay.replace(/\d/g, '');
  const intervalInSec = charToSeconds[interval];
  if (!intervalInSec) throw new Error(`Invalid interval: [${interval}]`);
  return parseInt(delay, 10) * intervalInSec;
};

const secondsToIntervalArr = {
  60: 'm',
  3600: 'h',
  86400: 'd',
  604800: 'w',
  2592000: 'mo',
  31536000: 'y',
};

const secondsDividerArr = [
  60,
  3600,
  86400,
  604800,
  2592000,
  31536000,
];

// This fn only works with 'minutes' in seconds,
// that is rounded seconds to the nearest minute
export const secondsToInterval = (secs) => {
  // eslint-disable-next-line no-param-reassign
  if (secs && typeof secs === 'string') secs = parseInt(secs, 10);

  let secondsDivider = secondsDividerArr[0];
  secondsDividerArr.forEach((s) => {
    if (secs >= s) secondsDivider = s;
  });
  const char = secondsToIntervalArr[secondsDivider];
  return `${Math.round(secs / secondsDivider)}${char}`;
};

export const dateFromTs = (timestamp) => new Date(timestamp * 1000).toISOString();
