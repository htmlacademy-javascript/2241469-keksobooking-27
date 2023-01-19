import {isEscEvent} from './util.js';
import {resetFilter} from './filter.js';

const ALERT_SHOW_TIME = 1000;
const errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const messContainer = document.createElement('div');

const showAlert = (message) => {


  const errorPopupMessage = errorPopup.querySelector('.error__message');
  errorPopupMessage.textContent = message;

  const closeErrorButton = errorPopup.querySelector('.error__button');

  document.body.appendChild(errorPopup);

  closeErrorButton.addEventListener('click', () => {
    errorPopup.remove();
  });


};

document.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();

    errorPopup.remove();
    successPopup.remove();
    messContainer.remove();

  }
});

document.addEventListener('click', () => {
  errorPopup.remove();
  successPopup.remove();
  messContainer.remove();

});

const showSuccess = () => {
  document.body.appendChild(successPopup);
  document.querySelector('.ad-form').reset();
  resetFilter();
};

const showError = (message) => {
  messContainer.classList.add('mystyle');
  messContainer.textContent = message;
  document.body.append(messContainer);
};

export {showAlert, showSuccess, showError};
