import {isEscEvent} from './util.js';
import {resetFilter} from './filter.js';

const showAlert = (message) => {

  const errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  const errorPopupMessage = errorPopup.querySelector('.error__message');
  errorPopupMessage.textContent = message;

  const closeErrorButton = errorPopup.querySelector('.error__button');

  document.body.appendChild(errorPopup);

  closeErrorButton.addEventListener('click', () => {
    errorPopup.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      errorPopup.remove();
    }
  });

  document.addEventListener('click', () => {
    errorPopup.remove();
  });

};

const showSuccess = () => {

  const successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

  document.body.appendChild(successPopup);


  //////при показе этого сообщения данные формы возвращаются обратно без обновления

  document.querySelector('.ad-form').reset();
  resetFilter();


  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      successPopup.remove();
    }
  });

  document.addEventListener('click', () => {
    successPopup.remove();
  });

};

const showError = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      alertContainer.remove();
    }
  });

  document.addEventListener('click', () => {
    alertContainer.remove();
  });

};

export {showAlert, showSuccess, showError};