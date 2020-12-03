import {generatePictures} from "./mock.js";

const PICTURE_COUNT = 25;

const initiationPage = () => {
  const pictures = new Array(PICTURE_COUNT)
    .fill(``)
    .map((_picture, index) => generatePictures(index));
};

window.addEventListener(`load`, initiationPage);
