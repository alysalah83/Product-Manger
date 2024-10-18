export const getStatus = function (status, clas = false) {
  if (clas) return status === 'available' ? 'green' : 'red';
  return status === 'available' ? 'In Stock' : 'out of Stock';
};
