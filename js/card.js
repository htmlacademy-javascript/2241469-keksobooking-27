const template = document.querySelector('#card').content;
const popup = template.querySelector('.popup');

const TYPES_HOUSES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  hotel: 'Отель',
  house: 'Дом',
  palace: 'Дворец',
};

const WIDTH_PHOTO = 45;
const HEIGHT_PHOTO = 40;

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
    PhotoElement.width = WIDTH_PHOTO;
    PhotoElement.height = HEIGHT_PHOTO;
    photosFragment.appendChild(PhotoElement);
  });
  return photosFragment;
};

const isAnything = (elem) => {
  if(elem && elem.textContent.length === 0) {
    elem.classList.add('visually-hidden');
  }
};

const renderCard = (arg) => {
  const cardElement = popup.cloneNode(true);

  const cardAvatar = cardElement.querySelector('.popup__avatar');
  cardAvatar.src = arg.author.avatar;
  if(cardAvatar && cardAvatar.length === 0) {
    cardAvatar.classList.add('visually-hidden');
  }

  const cardAdress = cardElement.querySelector('.popup__text--address');
  cardAdress.textContent = arg.offer.address;
  isAnything(cardAdress);

  const cardTitle = cardElement.querySelector('.popup__title');
  cardTitle.textContent = arg.offer.title;
  isAnything(cardTitle);

  const cardPrice = cardElement.querySelector('.popup__text--price');
  cardPrice.textContent = `${arg.offer.price} ₽/ночь`;
  isAnything(cardPrice);

  const cardType = cardElement.querySelector('.popup__type');
  cardType.textContent = TYPES_HOUSES[arg.offer.type];
  isAnything(cardType);

  const cardCapacity = cardElement.querySelector('.popup__text--capacity');
  cardCapacity.textContent = `${arg.offer.rooms}  комнаты для ${arg.offer.guests} гостей`;
  isAnything(cardCapacity);

  const cardTime = cardElement.querySelector('.popup__text--time');
  cardTime.textContent = `Заезд после ${arg.offer.checkin}, выезд до ${arg.offer.checkout}`;
  isAnything(cardTime);

  const CardDesc = cardElement.querySelector('.popup__description');
  CardDesc.textContent = arg.offer.description;
  isAnything(CardDesc);

  const Cardfeatures = cardElement.querySelector('.popup__features');
  Cardfeatures.innerHTML = '';
  if (arg.offer.features) {
    const newFeatureElements = createFeatures(arg.offer.features);
    Cardfeatures.appendChild(newFeatureElements);
  } else {
    Cardfeatures.classList.add('visually-hidden');
  }

  const CardPhoto = cardElement.querySelector('.popup__photos');
  CardPhoto.innerHTML = '';
  if (arg.offer.photos) {
    const newPhotoElements = createPhotos(arg.offer.photos);
    CardPhoto.appendChild(newPhotoElements);
  } else {
    CardPhoto.classList.add('visually-hidden');
  }

  return cardElement;
};

export {renderCard};
