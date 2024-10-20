import productView from './view/productView';
import optionsView from './view/optionsView';
import editView from './view/editView';
import searchView from './view/searchView';
import * as model from './model';

const controllLoadProduct = function (productValues) {
  // setting the product obj
  model.setProduct(productValues);

  //render product on the table
  productView.render(model.state.product);
};

const controllLoadStorage = function () {
  // getting data from local storage
  model.getProducts();

  // return when no local storage avialable
  if (model.state.products.length === 0) return;

  // render the local storage on the screen
  productView.render(model.state.products);
};

const controllReverseTable = function (arrow) {
  // render the new products with the true refare to clear the section
  arrow
    ? productView.render(model.state.productsSorted.toReversed(), true)
    : productView.render(model.state.productsSorted, true);
};

const controllSortChange = function (option, arrow) {
  // sort the products depend on the option
  model.sortProducts(option);

  // render the sorted prouctds depend on the option and the arrow
  controllReverseTable(arrow);
};

const controllRemoveAllProducts = function () {
  // clear local storage and model state and reset ids
  model.clearAll();

  // false refer to not render data and the true for clearing
  productView.render(false, true);
};

const controllEditedValues = function (id, valuesArr) {
  //if no values equal remove
  if (!valuesArr) {
    //remove the product form state produst and local
    model.removeProduct(id);

    //render new products and return
    return productView.render(model.state.products, true);
  }

  //editing state products and the local storage
  model.editProductsArr(id, valuesArr);
};

const controllSearchResults = function (value) {
  // getting the product and save it in state
  model.setResults(value);

  // render the products on the view
  productView.render(model.state.searchResults, true);
};

const init = function () {
  productView.addHandlerSubmit(controllLoadProduct);
  controllLoadStorage();
  optionsView.addHandlerArrowClick(controllReverseTable);
  optionsView.addHandlerSortChange(controllSortChange);
  optionsView.addHandlerClearAll(controllRemoveAllProducts);
  editView.addHandlerEditValues(controllEditedValues);
  searchView.addHandlerInputng(controllSearchResults);
};
init();
