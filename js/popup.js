import {isEscEvent} from './util.js';
import {resetFilter} from './filter.js';

const errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const messContainer = document.createElement('div');

const showAlert = (message) => {
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', removePopups);
  const errorPopupMessage = errorPopup.querySelector('.error__message');
  errorPopupMessage.textContent = message;

  const closeErrorButton = errorPopup.querySelector('.error__button');
  document.body.appendChild(errorPopup);

  closeErrorButton.addEventListener('click', () => {
    errorPopup.remove();
  });
};


function onEscKeyDown(evt) {
  if(evt.key === 'Escape' ){
    evt.preventDefault();
    removePopups();
  }
}

function removePopups(){
  errorPopup.remove();
  successPopup.remove();
  messContainer.remove();
  document.removeEventListener('keydown', onEscKeyDown);
  document.removeEventListener('click', removePopups);
}


const showSuccess = () => {
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', removePopups);
  document.body.appendChild(successPopup);
  document.querySelector('.ad-form').reset();
  resetFilter();
};

const showError = (message) => {
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', removePopups);
  messContainer.classList.add('mystyle');
  messContainer.textContent = message;
  document.body.append(messContainer);
};

export {showAlert, showSuccess, showError};
