<template>
  <div>
    <div class="title">
      <h1>In Stock</h1>
    </div>
    <product-list></product-list>
  </div>
</template>

<script>
  import ProductList from "../components/ProductList";

  export default {
    name: "Home",
    data() {
      return {
        msg: 'Welcome to my home',
        model: {"username": "lis", "password": "123"}
      }
    },
    // created() {
    //   this.$http.post('http://192.168.1.181:8082/login', this.model).then(res => {
    //       console.log(res)
    //     }
    //   )
    // },
    components: {
      'product-list': ProductList
    }
  }
</script>

<style scoped>

</style>
