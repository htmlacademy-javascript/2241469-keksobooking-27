import {enableForm, disableForm, setAddress} from'./form.js';
import {initMap, setOnMapLoad, setOnMainPinMove, startCoordinate} from './map.js';
import {setAdPins} from './map.js';
import {getData} from './api.js';
import {setUserFormSubmit} from './form-validate.js';
import {showAlert, showSuccess, showError} from './popup.js';
import {setChangeEventOnFilter, getFilterOffers } from './filter.js';
import {debounce} from './util.js';
import './pictures.js';

disableForm();

setOnMapLoad(()=> {
  setOnMainPinMove(setAddress);
  setAddress(startCoordinate);
});

initMap(startCoordinate);

setUserFormSubmit(showSuccess, showAlert);

getData((offers) => {
  setAdPins(offers);
  enableForm();
  setChangeEventOnFilter(
    debounce(() => {
      setAdPins(getFilterOffers(offers));
    })
  );
}, () => {
  showError('Не удалось получить объявления. Повторите попытку!');
});
