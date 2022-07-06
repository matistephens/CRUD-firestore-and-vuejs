<template>
  <v-app>
    <TablaUsuarios />
  </v-app>
</template>

<script>
import TablaUsuarios from "@/components/TablaUsuarios.vue";
import { mapActions } from "vuex";
export default {
  name: "App",

  methods: {
    ...mapActions("usuarios", {
      getAllUsuarios: "getAll",
    }),
  },
  created() {
    this.getAllUsuarios();
  },
  components: {
    TablaUsuarios,
  },
};
</script>
