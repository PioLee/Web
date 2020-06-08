<template>
  <div>
    <div class="title">
      <h1>{{msg}}</h1>
    </div>
    <product-item :products="cart"></product-item>
  </div>
</template>

<script>
  import ProductItem from "../components/ProductItem";

  export default {
    name: "Cart",
    data() {
      return {
        msg: 'Welcome to Cart Page'
      }
    },
    computed: {
      cart() {
        return this.$store.state.cart;
      }
    },
    // methods: {
    //   removeFromCart(productId) {
    //     this.$store.commit('REMOVE_FROM_CART', {
    //       productId
    //     });
    //   }
    // },
    components: {
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
