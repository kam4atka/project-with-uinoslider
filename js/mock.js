import {getRandomCount} from "./util.js";

const COMMENTS = [`Всё отлично!`, `В целом всё неплохо. Но не всё.`, `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`, `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`, `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`, `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];
const NAMES = [`Саша`, `Маша`, `Даша`, `Паша`, `Коля`, `Оля`, `Алексей`];

const LikesCount = {
  MIN: 0,
  MAX: 100
};

const CommentCount = {
  MIN: 0,
  MAX: 10
};

const getComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(() => {
      return {
        avatar: `img/avatar-${getRandomCount(1, 6)}.svg`,
        message: COMMENTS[getRandomCount(0, COMMENTS.length - 1)],
        name: NAMES[getRandomCount(0, NAMES.length - 1)]
      };
    });
};

export const generatePictures = (index) => {
  return {
    url: `photos/${index + 1}.jpg`,
    description: `Photo ${index}`,
    likes: getRandomCount(LikesCount.MIN, LikesCount.MAX),
    comments: getComments(getRandomCount(CommentCount.MIN, CommentCount.MAX))
  };
};
