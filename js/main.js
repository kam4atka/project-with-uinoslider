import {picturesParentBlock, createPicturesListElement} from "./gallery";
import {generatePictures} from "./mock.js";

const PICTURE_COUNT = 25;

const initiationPage = () => {
  const pictures = new Array(PICTURE_COUNT)
    .fill(``)
    .map((_picture, index) => generatePictures(index));

  picturesParentBlock.appendChild(createPicturesListElement(pictures));
};

window.addEventListener(`load`, initiationPage);
