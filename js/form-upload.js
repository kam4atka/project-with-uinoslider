import noUiSlider from "nouislider";
import {KeyCode, toggleScrollElement} from "./util.js";

import 'nouislider/distribute/nouislider.css';

const bodyElement = document.querySelector(`body`);
const uploadForm = bodyElement.querySelector(`.img-upload__form`);
const uploadFormCloseButton = uploadForm.querySelector(`#upload-cancel`);
const photoEditBlock = bodyElement.querySelector(`.img-upload__overlay`);
const photoPreviewElement = photoEditBlock.querySelector(`.img-upload__preview img`);
const effectLevelElement = photoEditBlock.querySelector(`.effect-level`);
const effectSliderElement = effectLevelElement.querySelector(`.effect-slider`);
const effectsList = photoEditBlock.querySelector(`.effects__list`);

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const Slider = {
  MIN_VALUE: 0,
  MAX_VALUE: 100
};
const effect = {
  chrome: (value) => `grayscale(${value / 100})`,
  sepia: (value) => `sepia(${value / 100})`,
  marvin: (value) => `invert(${value}%)`,
  phobos: (value) => `blur(${value * 0.03}px)`,
  heat: (value) => `brightness(${value * 0.02 + 1})`
};
const defaultEffect = `none`;

let currentClass = ``;
let slider;

const compareTypeFile = (file) => {
  return FILE_TYPES.some((fileType) => file.name.toLowerCase().endsWith(fileType));
};

const setPhotoPreview = (file) => {
  const fileReader = new FileReader();

  fileReader.addEventListener(`load`, () => {
    photoPreviewElement.src = fileReader.result;
  });

  fileReader.readAsDataURL(file);
};

const initiateSlider = (element) => {
  slider = noUiSlider.create(element, {
    start: Slider.MAX_VALUE,
    range: {
      min: [Slider.MIN_VALUE],
      max: [Slider.MAX_VALUE]
    }
  });
};

const resetEffectsForm = () => {
  effectsList.querySelectorAll(`.effects__radio`).forEach((effectsInput) => {
    effectsInput.checked = (effectsInput.value !== defaultEffect) ? false : true;
  });
};

const removeCurrentClassForPhoto = () => {
  if (currentClass !== ``) {
    photoPreviewElement.classList.remove(currentClass);
  }
};

const setEffectToPhoto = (nameEffect, value) => {
  if (nameEffect !== defaultEffect) {
    photoPreviewElement.style.filter = effect[nameEffect](value);
  } else {
    photoPreviewElement.style.filter = ``;
  }
};

const currentEffectHandler = (evt) => {
  evt.stopPropagation();
  setCurrentEffect(evt.target.value);
};

const setCurrentEffect = (nameEffect) => {
  if (nameEffect !== defaultEffect) {
    removeCurrentClassForPhoto();
    currentClass = `photo__preview--${nameEffect}`;

    photoPreviewElement.classList.add(currentClass);

    slider.off();
    effectLevelElement.style.display = `block`;
    slider.set([Slider.MAX_VALUE]);
    slider.on(`update`, (values, handle) => {
      setEffectToPhoto(nameEffect, values[handle]);
    });
  } else {
    removeCurrentClassForPhoto();
    setEffectToPhoto(nameEffect);
    currentClass = ``;

    effectLevelElement.style.display = `none`;
  }
};

const loadModalClickCloseHandler = (evt) => {
  evt.preventDefault();
  closeLoadModalForm();
};

const loadModalEscCloseHandler = (evt) => {
  if (evt.keyCode === KeyCode.ESC) {
    closeLoadModalForm();
  }
};

const closeLoadModalForm = () => {
  photoEditBlock.classList.add(`hidden`);
  toggleScrollElement(`on`, bodyElement);

  slider.destroy();
  slider = null;

  uploadForm.reset();

  uploadFormCloseButton.removeEventListener(`click`, loadModalClickCloseHandler);
  document.removeEventListener(`keydown`, loadModalEscCloseHandler);
};

const loadModalOpenHandler = (evt) => {
  const file = evt.target.files[0];
  openLoadModalForm(file);
};

const openLoadModalForm = (file) => {
  if (compareTypeFile(file)) {
    photoEditBlock.classList.remove(`hidden`);
    toggleScrollElement(`off`, bodyElement);
    setPhotoPreview(file);

    uploadFormCloseButton.addEventListener(`click`, loadModalClickCloseHandler);
    document.addEventListener(`keydown`, loadModalEscCloseHandler);

    resetEffectsForm();
    setEffectToPhoto(defaultEffect);

    effectLevelElement.style.display = `none`;

    initiateSlider(effectSliderElement);

    effectsList.addEventListener(`change`, currentEffectHandler);
  } else {
    uploadForm.reset();
  }
};

export const activateUploadForm = () => {
  uploadForm.addEventListener(`change`, loadModalOpenHandler);
};
