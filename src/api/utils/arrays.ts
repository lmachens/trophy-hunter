export const toggleArrayElement = (array, element) => {
  const elementIndex = array.indexOf(element);
  if (elementIndex === -1) {
    return [...array, element];
  }

  const arrayClone = [...array];
  arrayClone.splice(elementIndex, 1);
  return arrayClone;
};

export const zip = <T>(first: T[], ...others: T[][]): T[][] => {
  return first.map((element, index) => {
    return [element, ...others.map((array) => array[index])];
  });
};
