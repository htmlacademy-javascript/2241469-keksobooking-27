import {formActive, formDisable, setAddress} from'./form.js';
import {initMap, setOnMapLoad, setOnMainPinMove, startCoordinate} from './map.js';
import {setAdPins} from './map.js';
import {getData} from './api.js';
import {setUserFormSubmit} from './form-validate.js';
import {showAlert, showSuccess, showError} from './popup.js';
import {setChangeEventOnFilter, getFilterOffers } from './filter.js';
import {debounce} from './util.js';
import './pictures.js';

formDisable();

////загрузка карты
setOnMapLoad(()=> {
  setOnMainPinMove(setAddress);
  setAddress(startCoordinate);
});


initMap(startCoordinate);

/// отпрака данных
setUserFormSubmit(showSuccess, showAlert);

//получение данных и отриссовка меток с фильтрацией
getData((offers) => {
  setAdPins(offers);
  formActive();
  setChangeEventOnFilter(
    debounce(() => {
      setAdPins(getFilterOffers(offers));
    })
  );
}, () => {
  showError('Не удалось получить похожие объявления. Попробуй еще раз!');
});
