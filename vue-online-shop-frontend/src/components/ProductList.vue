<template>
  <div>
    <div class="products">
      <div class="container">
        This is ProductList
      </div>
      <product-item :products="products"></product-item>
    </div>
  </div>
</template>

<script>
  import ProductItem from "./ProductItem";

  export default {
    name: "product-list",

    created() {
      if (this.products.length === 0) {
        this.$store.dispatch('allProducts')
      }
    },
    computed: {
      // a computed getter
      products() {
        // return this.$store.state.products;
        return this.$store.getters.allProducts;
      }
    },
    // methods: {
    //   addToCart(product) {
    //     this.$store.commit('ADD_TO_CART', {
    //       product
    //     });
    //   },
    // },
    components:{
      'product-item': ProductItem
    }
  }
</script>

<style scoped>
  .product {
    border-bottom: 1px solid black;
  }

  .product__image {
    width: 100px;
    height: 100px;
  }
</style>
