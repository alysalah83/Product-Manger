import { getIndex } from './helper';

export const state = {
  product: {},
  products: [],
  productsSorted: [],
  searchResults: [],
  id: 0,
};

export const setProduct = function (productValues) {
  state.id++;
  state.product = { ...productValues, id: state.id };
  console.log(state.products);
  state.products.unshift(state.product);
  state.productsSorted = state.products;
  storgeProducts(state.products);

  console.log(state.product, state.id);
};

const storgeProducts = function (products) {
  localStorage.setItem('products', JSON.stringify(products));
};

export const getProducts = function () {
  const data = JSON.parse(localStorage.getItem('products'));
  if (!data) return;
  state.products = data;
  state.productsSorted = data;
  state.id = state.products.at(0).id;
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

export const editProductsArr = function (id, valuesArr) {
  console.log(id, valuesArr);
  const editedProductIndex = getIndex(state.products, id);
  state.products.at(editedProductIndex).name = valuesArr[0];
  state.products.at(editedProductIndex).model = valuesArr[1];
  state.products.at(editedProductIndex).manufacturer = valuesArr[2];
  state.products.at(editedProductIndex).price = valuesArr[3];
  state.products.at(editedProductIndex).quantity = valuesArr[4];
  state.products.at(editedProductIndex).status = valuesArr[5];
  storgeProducts(state.products);
};

export const removeProduct = function (id) {
  const removedProductIndex = getIndex(state.products, id);
  state.products.splice(removedProductIndex, 1);
  storgeProducts(state.products);
};

const getResults = function (value, type) {
  const products = state.products.filter(product => {
    const editedValue =
      type === 'id' ? product[type].toString() : product[type];
    return editedValue.toLowerCase().trim().includes(value);
  });
  state.searchResults = products;
};

export const setResults = function (value) {
  const editedValue = value.toLowerCase().trim();
  const isNumber = parseInt(value);

  isNumber ? getResults(editedValue, 'id') : getResults(editedValue, 'name');
};
