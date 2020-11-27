<template>
  <div>

  <div class="card">
    <div class="card-header">
      <h5 class="title">Registro de nuevos usuarios al sistema</h5>
      <!--<p class="category">Agregar usuario <a href="https://nucleoapp.com/?ref=1712">NucleoApp</a></p>-->
      <hr>
    </div>
    <div class="card-body all-icons">
      
      <base-alert type="danger" v-if="errorReditro">
         <strong>Error!</strong> Debe ingresar los datos correctos!
      </base-alert>
      <base-alert type="danger" v-if="errorExisteEmail">
         <strong>Error!</strong> Ya esta registrado el usuario!
      </base-alert>
      <modal :show.sync="modals.modal1">
            <h6 slot="header" class="modal-title" id="modal-title-default">Exito</h6>

            <p>Operación con EXITO</p>

            <template slot="footer">
                <!-- <base-button type="primary">Save changes</base-button> -->
                <base-button type="secondary" class="ml-auto" @click="modals.modal1 = false">Cerrar
                </base-button>
            </template>
        </modal>

      <div class="row">
        <div class="col-md-4 pr-md-1">
          <base-input label="email (ufps)"
            placeholder="algo@ufps.edu.co"
            type="email"
            v-model="dataRegistro.correo">
          </base-input>
        </div>
        <div class="col-md-4 pr-md-1">
          <base-input label="Contraseña"
            type="password"
            v-model="dataRegistro.clave"
            placeholder="password">
          </base-input>
        </div>
      </div>
      <div class="row">
        <base-input class="col-md-4" label="Tipo de Usuario">
          <select id="inputState" class="form-control" v-model="dataRegistro.tipoUsuario">
            <option selected>Seleccione...</option>
            <option>secretaria</option>
            <option>docente</option>
          </select>
        </base-input>
        <div class="col-md-4">
          <br>
          <base-button size="sm" type="primary" @click="guardar()">Agregar</base-button>
        </div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header">
      <h5 class="title">Restablecer Contraseña</h5>
      <hr>
    </div>
    <div class="card-body all-icons">
      <base-alert type="danger" v-if="errorRecover">
        <strong>Error!</strong> Debe ingresar los datos correctos!
      </base-alert>
      <base-alert type="danger" v-if="errorNoRegistro">
        <strong>Error!</strong> No esta registrado el usuario!
      </base-alert>
      <div class="row">
        <div class="col-md-4 pr-md-1">
          <base-input label="email (ufps)"
            placeholder="algo@ufps.edu.co"
            type="email"
            v-model="dataRecover.email">
          </base-input>
        </div>
        <div class="col-md-4 pr-md-1">
          <base-input label="Contraseña"
            type="password"
            v-model="dataRecover.password"
            placeholder="password">
          </base-input>
        </div>
        <div class="col-md-4">
          <br>
          <base-button size="sm" type="primary" @click="restablecer()">Restablecer</base-button>
        </div>
      </div>
    </div>
  </div>

  </div>
</template>
<script>
import { BaseButton, BaseAlert, Modal } from "@/components";
export default {
  components: {
    BaseButton,
    BaseAlert,
    Modal
  },
  data() {
    return {
      dataRegistro: {
        clave: '',
        correo: '',
        tipoUsuario: ''
      },
      dataRecover: {
        email: '',
        password: ''
      },
      errorReditro: false,
      errorRecover: false,
      errorExisteEmail: false,
      errorNoRegistro: false,
      modals: {
        modal1: false
      }
    }
  },
  methods: {
    async findUser(correo, callback) {
      await this.axios.get(`${this.$store.state.api}/user/email/${correo}`)
      .then( (resp) => {
        const json = resp.data;
        const { data, status } = json;
        callback();
        if (status === true) {
          return data.correo !== null;
        }
        return false;
      });
    },
    guardar() {
      const { correo, clave, tipoUsuario } = this.dataRegistro;
      if (correo && clave && tipoUsuario) {
        //const existeUsuario = this.findUser(correo);
        //if (!existeUsuario) {
        //  this.errorExisteEmail = true;
        //  return;
        //}     
        this.axios.post(`${this.$store.state.api}/user/registro`, {
          correo, clave, tipoUsuario
        }).then( (resp) => {
          this.errorReditro = false;
          this.errorExisteEmail = false;
          const json = resp.data;
          const { data, status } = json;
          if (status === true) {
            this.modals.modal1 = true;
            this.dataRegistro.clave = '';
            this.dataRegistro.correo = '';
            this.dataRegistro.tipoUsuario = '';
          }
        }).catch( error => {
          this.errorReditro = true;
        });
      } else {
        this.errorReditro = true;
      }
    },
    clearError() {
      this.errorRecover = false;
      this.errorNoRegistro = false;
      this.errorReditro = false;
      this.errorExisteEmail = false;
    },
    restablecer() {
      this.clearError();
      const { email, password } = this.dataRecover;
      if(email && password) {
        this.axios.post(`${this.$store.state.api}/user/recoverpassword`, {
          correo: email, clave: password
        }).then( (resp) => {
          const json = resp.data;
          const { data, status } = json;
          if (status === true) {
            this.modals.modal1 = true;
            this.dataRecover.email = '';
            this.dataRecover.password = '';
          } else {
            this.errorNoRegistro = true;
          }
        }).catch( error => {
          this.errorRecover = true;
        });
      }
    }
  }
};
</script>
<style>
</style>
