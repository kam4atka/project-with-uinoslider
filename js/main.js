import {picturesParentBlock, createPicturesListElement, showPictureBigElement} from "./gallery";
import {activateUploadForm} from "./form-upload.js";
// import {toggleScrollElement} from "./util.js";
import {generatePictures} from "./mock.js";

const PICTURE_COUNT = 25;

// const bodyElement = document.querySelector(`body`);

const initiationPage = () => {
  const pictures = new Array(PICTURE_COUNT)
    .fill(``)
    .map((_picture, index) => generatePictures(index));

  picturesParentBlock.appendChild(createPicturesListElement(pictures));
  // showPictureBigElement(pictures[0]);
  // toggleScrollElement(`off`, bodyElement);
  activateUploadForm();
};

window.addEventListener(`load`, initiationPage);
