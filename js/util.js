export const getRandomCount = (min, max) => {
  return Math.ceil(Math.random() * (max - min) + min);
};

export const toggleScrollElement = (action = `on`, element = null) => {
  if (!element) {
    return;
  }

  switch (action) {
    case `off`:
      element.classList.add(`modal-open`);
      break;
    case `on`:
      element.classList.remove(`modal-open`);
      break;
  }
};
