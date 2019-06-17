import ProductActions from './Goods/action';

const { ACTION_TYPES: PRODUCT_ACTION_TYPES, ...productRest } = ProductActions;

const ACTION_TYPES = {
  ...PRODUCT_ACTION_TYPES,
  ADD_PRODUCT: 'ADD_PRODUCT'
}

function addProduct() {
  console.log('addProduct');
}

const actions = {
  addProduct,
  ...productRest,
};

export default {
  ACTION_TYPES,
  ...actions
};
