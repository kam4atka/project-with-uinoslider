export const picturesParentBlock = document.querySelector(`.pictures`);
const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

const createPictureElement = (picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector(`.picture__img`).src = picture.url;
  pictureElement.querySelector(`.picture__likes`).textContent = picture.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = picture.comments.length;

  return pictureElement;
};

export const createPicturesListElement = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    fragment.appendChild(createPictureElement(picture));
  });

  return fragment;
};

export const showPictureBigElement = (picture) => {
  const pictureBigElement = document.querySelector(`.big-picture`);

  pictureBigElement.classList.remove(`hidden`);
  pictureBigElement.querySelector(`.big-picture__img img`).src = picture.url;
  pictureBigElement.querySelector(`.social__caption`).textContent = picture.description;
  pictureBigElement.querySelector(`.likes-count`).textContent = picture.likes;
  pictureBigElement.querySelector(`.comments-count`).textContent = picture.length;

  const commentsBlock = pictureBigElement.querySelector(`.social__comments`);
  const commentTemplate = commentsBlock.querySelector(`.social__comment`);
  commentsBlock.innerHTML = ``;

  picture.comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    const avatar = commentElement.querySelector(`img`);
    avatar.src = comment.avatar;
    avatar.alt = comment.name;
    commentElement.querySelector(`.social__text`).textContent = comment.message;
    commentsBlock.appendChild(commentElement);
  });

  pictureBigElement.querySelector(`.social__comment-count`).classList.add(`hidden`);
  pictureBigElement.querySelector(`.comments-loader`).classList.add(`hidden`);
};
