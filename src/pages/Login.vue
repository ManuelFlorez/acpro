<template>
  <div class="row center" style="padding-top: 50px;">
    <div class="col-md-4"></div>
    <div class="col-md-4">

      <card type="secondary"
        header-classes="bg-white pb-5"
        body-classes="px-lg-5 py-lg-5"
        class="border-0 mb-0"
      >
        <div style="background-color: #eee; padding: 20px; margin: 20px; border-radius:10px;">
          <img :src="image" alt="ing sistemas">
          Actividades Programa Ingeniería de sistemas
        </div>
        <base-alert type="danger" v-show="showAlerError">
          <strong>Error!</strong> credenciales incorrectas
        </base-alert>
        <form role="form">
          <base-input alternative
            v-model="email"
            class="mb-3"
            placeholder="Correo"
            addon-left-icon="tim-icons icon-single-02"
          ></base-input>
          <base-input alternative 
            v-model="password"
            type="password"
            placeholder="Clave"
            addon-left-icon="fab fa-dribbble"
          ></base-input>
          <base-checkbox v-model="recordar">
            Recordar me
          </base-checkbox>
          <div class="text-center">
            <base-button @click="iniciar()" type="primary" class="my-4">Iniciar</base-button>
          </div>
        </form>
      </card>
    </div>
    <div class="col-md-4"></div>
  </div>
</template>

<script>
import BaseAlert from "../components/BaseAlert"
import image from "../../public/img/logo_vertical_ingsistemas_ht180.png";

export default {
  components: {
    BaseAlert
  },
  data() {
    return {
      email: '',
      password: '',
      recordar: false,
      showAlerError: false,
      msgError: "",
      image: image
    }
  },
  methods: {
    iniciar() {
      if (this.email === '' && this.password === '') {
        this.showAlerError = true;
        return;
      }
      this.axios.post(`${this.$store.state.api}/login` , {
        email: this.email,
        password: this.password,
        rol: ""
      })
      .then( (resp) => {
        const json = resp.data;
        const { data, status } = json;
        if (status === true) {
          this.showAlerError = false;
          this.msgError = data;
          const token = data
          this.consultarPerfil(this.email);
          this.$router.push('/admin/dasboard')
        } else {
          this.showAlerError = true;
        }
      });
    },
    consultarPerfil(correo) {
      this.axios.get(`${this.$store.state.api}/user/email/${correo}`)
      .then( (resp) => {
        const json = resp.data;
        const { data, status } = json;
        if (status === true) {
          localStorage.setItem("user", JSON.stringify(data));
        }
      });
    }
  }
}
</script>