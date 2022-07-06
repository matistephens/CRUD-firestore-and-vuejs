<template>
  <hello-world />
</template>

<script>
import HelloWorld from "../components/HelloWorld";

export default {
  components: {},
  created() {
    this.$store.dispatch("usuarios/getAll");
  },
};
</script>
