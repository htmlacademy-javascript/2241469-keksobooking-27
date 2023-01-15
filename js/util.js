const DELAY = 500;
const isEscEvent = (evt) => evt.key === ('Escape' || 'Esc');

const debounce = (callback, timeoutDelay = DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {isEscEvent, debounce};
