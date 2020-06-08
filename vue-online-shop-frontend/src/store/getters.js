export const productGetters = {
  allProducts(state) {
    return state.products
  },
  productById: (state, getters) => id => {
    if (getters.allProducts.length > 0) {
      return getters.allProducts.filter(product => product.name === id)[0]
    } else {
      return state.product;
    }
  }
}

export const manufacturerGetters = {
  allManufacturers(state) {
    return state.manufacturers;
  },
  manufacturerById: (state, getters) => id => {
    if (getters.allManufacturers.length > 0) {
      return getters.allManufacturers.filter(manufacturer => manufacturer.name === id)[0]
    } else {
      return state.manufacturer;
    }
  }
}
