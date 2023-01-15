const DEFAULT_VALUE = 'any';
const PRICE_VALUE = {
  min: 10000,
  max: 50000,
};

const NUMBER_OF_SIMILAR_ADS = 10;

const filterTypeField = document.querySelector('#housing-type');
const filterPriceField = document.querySelector('#housing-price');
const filterRoomsField = document.querySelector('#housing-rooms');
const filterGuestsField = document.querySelector('#housing-guests');
const filterFeaturesFields = document.querySelectorAll('.map__checkbox');
const features = document.querySelectorAll('.map__features input');

const resetFilter = () => {
  filterTypeField.value = DEFAULT_VALUE;
  filterPriceField.value = DEFAULT_VALUE;
  filterRoomsField.value = DEFAULT_VALUE;
  filterGuestsField.value = DEFAULT_VALUE;

  features.forEach((elem) => {
    elem.checked = false;
  });
};

const getFilterType = (ad) => filterTypeField.value === ad.offer.type || filterTypeField.value === DEFAULT_VALUE;

const getFilterPrice = (ad) => {
  switch (filterPriceField.value) {
    case 'any':
      return true;
    case 'low':
      return ad.offer.price <= PRICE_VALUE.min || ad.offer.price === DEFAULT_VALUE;
    case 'middle':
      return ad.offer.price > PRICE_VALUE.min && ad.offer.price <= PRICE_VALUE.max || ad.offer.price === DEFAULT_VALUE;
    case 'high':
      return ad.offer.price > PRICE_VALUE.max || ad.offer.price === DEFAULT_VALUE;
  }
};

const getFilterRooms = (ad) => ad.offer.rooms === Number(filterRoomsField.value) || filterRoomsField.value === DEFAULT_VALUE;

const getFilterGuests = (ad) => ad.offer.guests === Number(filterGuestsField.value) || filterGuestsField.value === DEFAULT_VALUE;

const getFilterFeatures = (ad) => Array.from(features)
  .every((feature) => {
    if (!feature.checked) {
      return true;
    }
    if (!ad.offer.features) {
      return false;
    }
    return ad.offer.features.includes(feature.value);
  });


const getFilterOffers = (ads) => {

  const filteredData = [];
  for (let i = 0; i < ads.length; i++) {
    const ad = ads[i];
    if (
      getFilterType(ad) &&
      getFilterPrice(ad) &&
      getFilterRooms(ad) &&
      getFilterGuests(ad) &&
      getFilterFeatures(ad)
    ) {
      filteredData.push(ad);
    }
    if (filteredData.length === NUMBER_OF_SIMILAR_ADS) {
      break;
    }
  }
  return filteredData;
};


const setChangeEventOnFilter = (cb) => {

  filterTypeField.addEventListener('change', () => {
    cb();
  });

  filterPriceField.addEventListener('change', () => {
    cb();
  });

  filterRoomsField.addEventListener('change', () => {
    cb();
  });

  filterGuestsField.addEventListener('change', () => {
    cb();
  });

  filterFeaturesFields.forEach((feature) => feature.addEventListener('click', () => {
    cb();
  }));
};

export { resetFilter, setChangeEventOnFilter, getFilterOffers };
