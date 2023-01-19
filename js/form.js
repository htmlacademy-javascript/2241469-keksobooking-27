import './form-validate.js';

const DIGITS_AFTER_POINT = 5;
const adForm = document.querySelector('.ad-form');
const mapFilterForm = document.querySelector('.map__filters');
const fieldsets = adForm.querySelectorAll('fieldset');
const mapfieldsets = mapFilterForm.querySelectorAll('fieldset');
const adress = adForm.querySelector('#address');

const disableAdress = () =>{
  adress.disabled = true;
};


const disableForm = () => {
  disableAdress();
  adForm.classList.add('ad-form--disabled');
  fieldsets.forEach((elem)=>{
    elem.disabled = true;
  });
  mapFilterForm.classList.add('map__filters--disabled');
  mapfieldsets.forEach((elem)=>{
    elem.disabled = true;
  });
};


const enableForm = () => {
  adForm.classList.remove('ad-form--disabled');
  fieldsets.forEach((elem)=>{
    elem.disabled = false;
  });
  mapFilterForm.classList.remove('map__filters--disabled');
  mapfieldsets.forEach((elem)=>{
    elem.disabled = false;
  });
};


const setAddress = (coordinates) => {
  adress.value = `${coordinates.lat.toFixed(DIGITS_AFTER_POINT)}, ${coordinates.lng.toFixed(DIGITS_AFTER_POINT)}`;
};

export {enableForm, disableForm, setAddress};
