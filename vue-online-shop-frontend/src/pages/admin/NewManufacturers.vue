<template>
  <manufacturer-form
    @save-manufacturer="addManufacturer"
    :model="model"
  >
  </manufacturer-form>
</template>

<script>
  import ManufacturerForm from "../../components/ManufacturerForm";

  export default {
    name: "NewManufacturers",
    computed: {
      model() {
        return {};
      }
    },
    methods: {
      addManufacturer(model) {
        this.$store.dispatch('addManufacturer', {
          manufacturer: model,
        })
      },
    },
    components: {
      'manufacturer-form': ManufacturerForm
    }
  }
</script>

<style scoped>

</style>
