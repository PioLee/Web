<template>
  <div>
    <product-form
      @save-product="addProduct"
      :model="model"
      :manufacturers="manufacturers"
    >
    </product-form>
  </div>
</template>

<script>
  import ProductForm from "../../components/ProductForm";

  export default {
    name: "New",
    // data() {
    //   return {
    //     model: {manufacturer: {name: ''}}
    //   }
    // },
    created() {
      if (this.manufacturers.length === 0) {
        this.$store.dispatch('allManufacturers');
      }
    },
    computed: {
      manufacturers() {
        return this.$store.getters.allManufacturers;
      },
      model() {
        return {};
      }
    },
    methods: {
      addProduct(model) {
        this.$store.dispatch('addProduct', {
          product: model,
        })
      },
    },
    components: {
      'product-form': ProductForm
    }
  }
</script>

<style scoped>

</style>
