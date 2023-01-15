import {sendData} from './api.js';
import {DEFAULT_AVATAR, previewPhoto, previewAvatar } from './pictures.js';
import {resetMainMark} from './map.js';
import {resetFilter} from './filter.js';

const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
const MAX_PRICE = 100000;

const roomsOption = {
  1 : ['1'],
  2 : ['2', '1'],
  3 : ['3', '2', '1'],
  100 : ['0'],
};

const capacityOption = {
  0 : ['100'],
  1 : ['1'],
  2 : ['1', '2'],
  3 : ['3', '2', '1'],
};

const form = document.querySelector('.ad-form');
const capacityField = form.querySelector('#capacity');
const roomField = form.querySelector('#room_number');
const titleField = form.querySelector('#title');
const priceField = form.querySelector('#price');
const typeHousingField = form.querySelector('#type');
const submitBtn = form.querySelector('.ad-form__submit');
const sliderElement = document.querySelector('.ad-form__slider');


const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--invalid',
}, true);

const typeofHouseOption = {
  'bungalow': '0',
  'flat' : '1000',
  'hotel' : '3000',
  'house' : '5000',
  'palace' : '10000',
};


const validateCapasity = () => roomsOption[roomField.value].includes(capacityField.value);
const validateTitle = (value) => value.length >= TITLE_MIN_LENGTH && value.length <= TITLE_MAX_LENGTH;
const validateMaxPrice = (value) => value <= MAX_PRICE;
const validateMinPrice = (value) => parseInt(value, 10) >= typeofHouseOption[typeHousingField.value];
const onlyNumber = (value) => /^(0|-?[1-9]\d*)$/.test(value);


const getCapacityErrorMessage = () =>
  `Для указанного колличества гостей требуется ${capacityOption[capacityField.value].join(' или ')} комнат.`;

const getTitleErrorMessage = () =>
  `Заголовок должен содержать от ${TITLE_MIN_LENGTH} до ${TITLE_MAX_LENGTH} символов`;

const getRoomsErrorMessage = () =>
  `указанное колличество комнат вмещает ${roomsOption[roomField.value].join(' или ')} гостей.`;

const getMinPriceErrorMessage = () => {
  const typeHousing = form.querySelector('#type').value;
  return `Минимальная цена для данного типа жилья ${typeofHouseOption[typeHousing]}`;
};

pristine.addValidator(
  capacityField,
  validateCapasity,
  getCapacityErrorMessage,
);

pristine.addValidator(
  roomField,
  validateCapasity,
  getRoomsErrorMessage ,
);

pristine.addValidator(
  titleField,
  validateTitle,
  getTitleErrorMessage ,
);


pristine.addValidator(
  priceField,
  validateMinPrice,
  getMinPriceErrorMessage ,
);

pristine.addValidator(
  priceField,
  validateMaxPrice,
  `Максимальное значение — ${MAX_PRICE}`);

pristine.addValidator(
  priceField,
  onlyNumber,
  'Некорректное значение');


const sliderConfig = {
  min: 0,
  max: 100000,
  start : priceField.placeholder,
  step: 1,
};

noUiSlider.create(sliderElement, {
  range : {
    min : sliderConfig.min,
    max : sliderConfig.max,
  },
  start : sliderConfig.start,
  step: sliderConfig.step,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

const setTypePrice = () => {
  priceField.placeholder = typeofHouseOption[typeHousingField.value];
  priceField.min = typeofHouseOption[typeHousingField.value];
};

sliderElement.noUiSlider.on('update', () => {
  priceField.value = sliderElement.noUiSlider.get();
  pristine.validate();
});

typeHousingField.addEventListener('change', ()=> {
  setTypePrice();
  sliderElement.noUiSlider.set(priceField.placeholder);
});

const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');

const getTimeInChange = () => {
  timeIn.value = timeOut.value;
};

const getTimeOutChange = () => {
  timeOut.value = timeIn.value;
};

timeIn.addEventListener('change', getTimeOutChange);
timeOut.addEventListener('change', getTimeInChange);


capacityField.addEventListener('change', () => {
  pristine.validate(capacityField);
  pristine.validate(roomField);
});

roomField.addEventListener('change', () => {
  pristine.validate(roomField);
  pristine.validate(capacityField);
});


const blockSubmitButton = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = 'Сохранить';
};

const resetBtn = form.querySelector('.ad-form__reset');
const resetForm = () => {
  pristine.reset();
  form.reset();
  resetMainMark();
  previewPhoto.innerHTML = '';
  previewAvatar.src = DEFAULT_AVATAR;
  priceField.placeholder = typeofHouseOption[typeHousingField.value];
  sliderElement.noUiSlider.set(typeofHouseOption[typeHousingField.value]);
};

resetBtn.addEventListener('click', (evt)=> {
  evt.preventDefault();
  resetForm();
  resetFilter();
});


const setUserFormSubmit = (onSuccess, onFail) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          onFail('Не удалось отправить форму. Попробуйте ещё раз');
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit};
