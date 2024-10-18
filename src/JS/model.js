export const state = {
  product: {},
  products: [],
  id: 0,
};

export const setProduct = function (productValues) {
  state.id++;
  state.product = { ...productValues, id: state.id };
  console.log(state.products);
  state.products.push(state.product);
  storgeProducts(state.products);

  console.log(state.product);
};

const storgeProducts = function (products) {
  localStorage.setItem('products', JSON.stringify(products));
};

export const getProducts = function () {
  const data = JSON.parse(localStorage.getItem('products'));
  if (!data) return;
  state.products = data;
  state.id = state.products.at(-1).id;
  console.log(state.products);
};

const clear = function () {
  localStorage.clear();
};
// clear();
