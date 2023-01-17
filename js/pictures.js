const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const fileChooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
const previewPhoto = document.querySelector('.ad-form__photo');


fileChooserAvatar.addEventListener('change', () => {
  const file = fileChooserAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewAvatar.src = URL.createObjectURL(file);
  }
});


fileChooserPhoto.addEventListener('change', () => {

  const file = fileChooserPhoto.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  previewPhoto.innerHTML = '';
  const imagesHouse = document.createElement('img');
  imagesHouse.alt = 'Фотография жилья';
  imagesHouse.style.maxWidth = '100%';
  imagesHouse.style.height = 'auto';
  imagesHouse.style.borderRadius = '5px';

  if (matches) {
    imagesHouse.src = URL.createObjectURL(file);
  }

  previewPhoto.append(imagesHouse);

});


export {DEFAULT_AVATAR, previewPhoto, previewAvatar };
