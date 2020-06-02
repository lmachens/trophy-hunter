export const parseJSON = (json: string, defaultValue = null) => {
  try {
    return JSON.parse(json);
  } catch (error) {
    return defaultValue;
  }
};
