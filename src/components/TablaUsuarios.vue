<template>
  <v-data-table :headers="headers" :items="usuarios" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Desafío CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Nuevo usuario
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5"></span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.nombre"
                      label="Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.correo"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item.id)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Nombre", value: "nombre" },
      { text: "Correo electrónico", value: "correo" },
      { text: "Acciones", value: "actions" },
    ],
    editedIndex: "",
    editedItem: {},
    updateUser: false,
  }),
  computed: {
    ...mapState("usuarios", {
      usuarios: (state) => state.list,
      loading: (state) => state.loading,
    }),
  },
  methods: {
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    ...mapActions("usuarios", {
      borrarUsuarioPorId: "borrarUsuario",
      getAllUsers: "getAll",
      agregarUnNuevoUsuario: "agregarUsuario",
      editarUsuarioPorId: "editarUsuario",
    }),
    async deleteItem(item) {
      await this.borrarUsuarioPorId(item);
      await this.getAllUsers();
    },
    async save() {
      if (!this.updateUser) {
        await this.agregarUnNuevoUsuario(this.editedItem);
        await this.getAllUsers();

        this.dialog = false;
      } else {
        this.dialog = false;
        await this.editarUsuarioPorId(this.editedItem);
        this.updateUser = false;
        await this.getAllUsers();
      }
      this.editedItem = {};
    },
    editItem(item) {
      this.updateUser = true;
      this.dialog = true;
      this.editedItem = Object.assign({}, item);
    },
  },
};
</script>

<style></style>
