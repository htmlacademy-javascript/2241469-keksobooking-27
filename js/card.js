const template = document.querySelector('#card').content;
const popup = template.querySelector('.popup');

const PHOTO_WIDTH = 45;
const PHOTO_HEIGHT = 40;

const TYPES_OF_HOUSING = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};


const createFeatures = (features) => {
  const featuresFragment = document.createDocumentFragment();
  features.forEach((element) => {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature', `popup__feature--${element}`);
    featuresFragment.appendChild(featureElement);
  });
  return featuresFragment;
};

const createPhotos = (photos) => {
  const photosFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const PhotoElement = document.createElement('img');
    PhotoElement.classList.add('popup__photo');
    PhotoElement.src = photo;
    PhotoElement.alt = 'Фотография жилья';
    PhotoElement.width = PHOTO_WIDTH;
    PhotoElement.height = PHOTO_HEIGHT;
    photosFragment.appendChild(PhotoElement);
  });
  return photosFragment;
};

const isAnything = (elem) => {
  if(elem && elem.textContent.length === 0) {
    elem.classList.add('visually-hidden');
  }
};

const renderCard = (arr) => {
  const cardElement = popup.cloneNode(true);

  const cardAvatar = cardElement.querySelector('.popup__avatar');
  cardAvatar.src = arr.author.avatar;
  if(cardAvatar && cardAvatar.length === 0) {
    cardAvatar.classList.add('visually-hidden');
  }

  const cardAdress = cardElement.querySelector('.popup__text--address');
  cardAdress.textContent = arr.offer.address;
  isAnything(cardAdress);

  const cardTitle = cardElement.querySelector('.popup__title');
  cardTitle.textContent = arr.offer.title;
  isAnything(cardTitle);

  const cardPrice = cardElement.querySelector('.popup__text--price');
  cardPrice.textContent = `${arr.offer.price} ₽/ночь`;
  isAnything(cardPrice);

  const cardType = cardElement.querySelector('.popup__type');
  cardType.textContent = TYPES_OF_HOUSING[arr.offer.type];
  isAnything(cardType);

  const cardCapacity = cardElement.querySelector('.popup__text--capacity');
  cardCapacity.textContent = `${arr.offer.rooms}  комнаты для ${arr.offer.guests} гостей`;
  isAnything(cardCapacity);

  const cardTime = cardElement.querySelector('.popup__text--time');
  cardTime.textContent = `Заезд после ${arr.offer.checkin}, выезд до ${arr.offer.checkout}`;
  isAnything(cardTime);

  const CardDesc = cardElement.querySelector('.popup__description');
  CardDesc.textContent = arr.offer.description;
  isAnything(CardDesc);

  const Cardfeatures = cardElement.querySelector('.popup__features');
  Cardfeatures.innerHTML = '';
  if (arr.offer.features) {
    const newFeatureElements = createFeatures(arr.offer.features);
    Cardfeatures.appendChild(newFeatureElements);
  } else {
    Cardfeatures.classList.add('visually-hidden');
  }

  const CardPhoto = cardElement.querySelector('.popup__photos');
  CardPhoto.innerHTML = '';
  if (arr.offer.photos) {
    const newPhotoElements = createPhotos(arr.offer.photos);
    CardPhoto.appendChild(newPhotoElements);
  } else {
    CardPhoto.classList.add('visually-hidden');
  }

  return cardElement;
};

export {renderCard};
