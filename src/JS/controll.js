import productView from './view/productView';
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

const init = function () {
  productView.addHandlerSubmit(controllLoadProduct);
  controllLoadStorage();
};
init();
