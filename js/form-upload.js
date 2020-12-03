import {KeyCode, toggleScrollElement} from "./util.js";

const bodyElement = document.querySelector(`body`);
const uploadForm = bodyElement.querySelector(`.img-upload__form`);
const uploadFormCloseButton = uploadForm.querySelector(`#upload-cancel`);
const photoEditBlock = bodyElement.querySelector(`.img-upload__overlay`);
const photoPreviewElement = photoEditBlock.querySelector(`.img-upload__preview img`);

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

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
  } else {
    uploadForm.reset();
  }
};

export const activateUploadForm = () => {
  uploadForm.addEventListener(`change`, loadModalOpenHandler);
};
