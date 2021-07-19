/* eslint-disable import/prefer-default-export */
export const formatDate = (date) => {
  try {
    if (date) { return new Date(date).toISOString().slice(0, 10); }
    return '';
  } catch {
    return '';
  }
};
