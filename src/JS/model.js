export const state = {
  product: {},
  products: [],
  productsSorted: [],
  id: 0,
};

export const setProduct = function (productValues) {
  state.id++;
  state.product = { ...productValues, id: state.id };
  console.log(state.products);
  state.products.unshift(state.product);
  state.productsSorted = state.products;
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
  state.productsSorted = data;
  state.id = state.products.at(-1).id;
  console.log(state.products);
};

export const sortProducts = function (option) {
  state.productsSorted = state.products.toSorted(
    (a, b) => b[option] - a[option]
  );
  console.log(state.productsSorted);
};

export const setProductSortedOnload = function () {
  state.productsSorted = state.products;
};

export const clearAll = function () {
  state.products.splice(0);
  state.productsSorted.splice(0);
  state.id = 0;
  localStorage.clear();
};
