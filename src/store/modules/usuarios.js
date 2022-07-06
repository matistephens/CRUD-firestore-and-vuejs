import Firebase from "firebase";

export const usuariosModule = {
  namespaced: true,
  state: {
    list: [],
    loading: false,
  },
  mutations: {
    SET_LIST(state, newList) {
      state.list = newList;
    },
    SET_LOADING(state, newLoading) {
      state.loading = newLoading;
    },
  },
  actions: {
    async getAll({ commit }) {
      commit("SET_LOADING", true);
      try {
        const usuarios = [];
        const ColeccionUsuarios = await Firebase.firestore()
          .collection("usuarios")
          .get();

        ColeccionUsuarios.forEach((document) => {
          usuarios.push({ ...document.data(), id: document.id });
        });
        console.log(usuarios);
        commit("SET_LIST", usuarios);
      } catch (e) {
        console.error("Error al traer usuarios de Firebase", e);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async borrarUsuario({ commit }, id) {
      commit("SET_LOADING", true);
      try {
        await Firebase.firestore().collection("usuarios").doc(id).delete();
      } catch (e) {
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async agregarUsuario({ commit }, usuario) {
      commit("SET_LOADING", true);
      try {
        await Firebase.firestore().collection("usuarios").doc().set(usuario);
      } catch (e) {
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async editarUsuario({ commit }, usuario) {
      commit("SET_LOADING", true);
      try {
        await Firebase.firestore()
          .collection("usuarios")
          .doc(usuario.id)
          .update({ nombre: usuario.nombre, correo: usuario.correo });
      } catch (e) {
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
};
