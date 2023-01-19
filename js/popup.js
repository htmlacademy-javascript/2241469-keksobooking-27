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


  document.addEventListener('click', () => {
    errorPopup.remove();
  });

};

const showSuccess = () => {

  const successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

  document.body.appendChild(successPopup);

  document.querySelector('.ad-form').reset();
  resetFilter();

  document.addEventListener('click', () => {
    successPopup.remove();
  });

};

const showError = (message) => {
  const messContainer = document.createElement('div');
  messContainer.style.zIndex = '100';
  messContainer.style.position = 'absolute';
  messContainer.style.left = '0';
  messContainer.style.top = '0';
  messContainer.style.right = '0';
  messContainer.style.padding = '10px 3px';
  messContainer.style.fontSize = '30px';
  messContainer.style.textAlign = 'center';
  messContainer.style.backgroundColor = 'red';

  messContainer.textContent = message;

  document.body.append(messContainer);

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();

      alertContainer.remove();
      errorPopup.remove();
      successPopup.remove();
      messContainer.remove();

    }
  });

  document.addEventListener('click', () => {
    messContainer.remove();
  });

};

export {showAlert, showSuccess, showError};
