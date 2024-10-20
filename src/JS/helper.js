export const getStatus = function (status, clas = false) {
  if (clas) return status === 'In Stock' ? 'green' : 'red';
  return status === 'In Stock' ? 'In Stock' : 'out of Stock';
};

export const getIndex = function (arr, id) {
  return arr.findIndex(obj => obj.id === id);
};
