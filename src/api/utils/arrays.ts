export const toggleArrayElement = (array, element) => {
  const elementIndex = array.indexOf(element);
  if (elementIndex === -1) {
    return [...array, element];
  }

  const arrayClone = [...array];
  arrayClone.splice(elementIndex, 1);
  return arrayClone;
};

export const zip = (a: any[], b: any[]): any[] => {
  return a.map((element, index) => [element, b[index]]);
};
