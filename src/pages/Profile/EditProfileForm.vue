<template>
  <card>
    <modal :show.sync="modals.modal1">
      <h6 slot="header" class="modal-title" id="modal-title-default">Exito</h6>

      <p>{{ modals.msg }}</p>

      <template slot="footer">
        <!-- <base-button type="primary">Save changes</base-button> -->
        <base-button type="secondary" class="ml-auto" @click="modals.modal1 = false">Cerrar
          </base-button>
        </template>
    </modal>

    <h5 slot="header" class="title">Editar Perfil</h5>
    <div class="row">
      <div class="col-md-5 pr-md-1">
        <base-input label="email (ufps)"
                  placeholder="Company"
                  v-model="model.company"
                  disabled>
        </base-input>
      </div>
      <div class="col-md-3 px-md-1">
        <base-input label="Username"
                  placeholder="Nombre de usuario"
                  v-model="model.username">
        </base-input>
      </div>
      <div class="col-md-4 pl-md-1">
        <base-input label="correo ufps"
                  type="email"
                  placeholder="admin@ufps.edu.co"
                  v-model="model.email">
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input label="Nombre"
                  v-model="model.firstName"
                  placeholder="Nombre">
        </base-input>
      </div>
      <div class="col-md-6 pl-md-1">
        <base-input label="Apellido"
                  v-model="model.lastName"
                  placeholder="Apellido">
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <base-input label="Dirección"
                  v-model="model.address"
                  placeholder="dirección">
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 pr-md-1">
        <base-input label="Ciudad"
                  v-model="model.city"
                  placeholder="Ciudad">
        </base-input>
      </div>
      <div class="col-md-4 px-md-1">
        <base-input label="Pais"
                  v-model="model.country"
                  placeholder="Pais">
        </base-input>
      </div>
      <!--
      <div class="col-md-4 pl-md-1">
        <base-input label="Código postal"
                  placeholder="ZIP Code"
                  disabled>
        </base-input>
      </div>
      -->
    </div>
    <div class="row">
      <div class="col-md-8">
        <base-input>
          <label>Sobre Mi</label>
          <textarea rows="4" cols="80"
                    class="form-control"
                    placeholder="Escribe algo sobre tí"
                    v-model="model.about">

              </textarea>
        </base-input>
      </div>
    </div>
    <base-button slot="footer" type="primary" @click="imprimeModel()" fill>Guardar</base-button>
  </card>
</template>
<script>
import { Modal } from "@/components";
  export default {
    components: {
      Modal
    },
    props: {
      model: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    data() {
      return {
        modals: {
          modal1: false,
          msg: ''
        }
      }
    },
    methods: {
      imprimeModel() {
        this.axios.post(`${this.$store.state.api}api/user/editarPerfil`, {
          apellidos: this.model.lastName,
          ciudad: this.model.city,
          descripcion: this.model.about,
          direccion: this.model.address,
          email: this.model.email,
          nombres: this.model.firstName,
          pais: this.model.country,
          username: this.model.username
        })
        .then( (resp) => {
          const json = resp.data;
          const { data, status } = json;
          if (status === true) {
            this.modals.modal1 = true;
            this.modals.msg = data;
          }
        });
      }
    }
  }
</script>
<style>
</style>
