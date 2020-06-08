import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import {productGetters, manufacturerGetters} from './getters';
import {productMutations, cartMutations, manufacturerMutations} from './mutations';
import {productActions, manufacturerActions} from './actions';


const API_BASE = 'http://127.0.0.1:8000';
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  // 全局参数
  state: {
    // bought items
    cart: [],
    // ajax loader
    showLoader: false,
    // selected product
    product: {},
    // all products
    products: [],
    // all manufacturers
    manufacturers: [],
  },
  mutations: {
    ...productMutations,
    ...cartMutations,
    ...manufacturerMutations,
    // REMOVE_FROM_CART(state, payload) {
    //   const {productId} = payload
    //   state.cart = state.cart.filter(product => product._id !== productId)
    // },
    // ALL_PRODUCTS(state) {
    //   state.showLoader = true;
    // },
    // ALL_PRODUCTS_SUCCESS(state, payload) {
    //   const {products} = payload;
    //   state.showLoader = false;
    //   state.products = products;
    // },
    // PRODUCT_BY_ID(state) {
    //   state.showLoader = true;
    // },
    // PRODUCT_BY_ID_SUCCESS(state, payload) {
    //   state.showLoader = false;
    //   const {product} = payload;
    //   state.product = product;
    // }
  },
  getters: {
    // allProducts(state) {
    //   return state.products;
    // },
    // productById: (state, getters) => id => {
    //   if (getters.allProducts.length > 0) {
    //     return getters.allProducts.filter(p => p.name === id)[0];
    //   } else {
    //     return state.product;
    //   }
    // }
    ...productGetters,
    ...manufacturerGetters,
  },
  actions: {
    // allProducts({commit}) {
    //   commit('ALL_PRODUCTS')
    //   axios.get(`${API_BASE}/products`).then(response => {
    //     console.log('response', response);
    //     commit('ALL_PRODUCTS_SUCCESS', {
    //       products: response.data.msg,
    //     });
    //   })
    // },
    // removeProduct({commit}, payload) {
    //   commit('REMOVE_PRODUCT');
    //
    //   const {productId} = payload;
    //   axios.delete(`${API_BASE}/products/${productId}`).then(() => {
    //     // 返回 productId，用于删除本地对应的商品
    //     commit('REMOVE_PRODUCT_SUCCESS', {
    //       productId,
    //     });
    //   })
    // },
    // allManufacturers({commit}) {
    //   commit('ALL_MANUFACTURERS');
    //
    //   axios.get(`${API_BASE}/manufacturers`).then(response => {
    //     commit('ALL_MANUFACTURERS_SUCCESS', {
    //       manufacturers: response.data.msg,
    //     });
    //   })
    // },
    // removeManufacturer({commit}, payload) {
    //   commit('REMOVE_MANUFACTURER');
    //
    //   const {manufacturerId} = payload;
    //   axios.delete(`${API_BASE}/manufacturers/${manufacturerId}`).then(() => {
    //     // 返回 manufacturerId，用于删除本地对应的制造商
    //     commit('REMOVE_MANUFACTURER_SUCCESS', {
    //       manufacturerId,
    //     });
    //   })
    // },
    // productById({commit}, payload) {
    //   commit('PRODUCT_BY_ID');
    //   const {productId} = payload;
    //   axios.get(`${API_BASE}/products/${productId}`).then(response => {
    //     commit('PRODUCT_BY_ID_SUCCESS', {
    //       product: response.data.msg,
    //     });
    //   })
    // }
    ...productActions,
    ...manufacturerActions,
  }
})
