<template>
  <div class="card">
    <div class="card-header">
      <h5 class="title">Registro de Actividades</h5>
      <p class="category">
        Agregar <a href="#/admin/registrar_actividad" @click="modals.modal0 = true">Tipo Actividad</a>,
        Agregar <a href="#/admin/registrar_actividad" @click="modals.modal1 = true">Tipo Responsable</a>
      </p>
      
      <modal :show.sync="modals.modal0" :centered="false">
        <template slot="header">
          <h5 class="modal-title" id="exampleModalLabel">Registrar tipo de actividad</h5>
        </template>
        
          <div>
            <label style="color:black">Tipo actividad</label>
            <input label="Ciudad"
              v-model="model.newTipoAct"
              placeholder="Tipo Actividad"
              style="width:100%; border-bottom: black solid; border-top:none; border-left:none; border-right:none;" />
            
          </div>

        <template slot="footer">
          <base-button type="secondary" @click="modals.modal0 = false">Cancelar</base-button>
          <base-button type="primary" @click="guardarTipoActividad()">Guardar</base-button>
        </template>
      </modal>

      <modal :show.sync="modals.modal1" :centered="false">
        <template slot="header">
          <h5 class="modal-title" id="exampleModalLabel">Registrar tipo de responsable</h5>
        </template>
        
          <div>
            <label style="color:black">Tipo responsable</label>
            <input label="Ciudad"
              v-model="model.newTipoRes"
              placeholder="Tipo Responsable"
              style="width:100%; border-bottom: black solid; border-top:none; border-left:none; border-right:none;" />
            
          </div>

        <template slot="footer">
          <base-button type="secondary" @click="modals.modal1 = false">Cancelar</base-button>
          <base-button type="primary" @click="guardarTipoResponsable()">Guardar</base-button>
        </template>
      </modal>

      <hr>
      <div class="row">
        <base-input class="col-md-4" label="Tipo de Actividad">
          <select id="inputState" class="form-control" v-model="tipoActividad">
            <option>Seleccione...</option>
            <option v-for="actividad in tiposActividades" :key="actividad.id" :value="actividad.id">
              {{actividad.nombre}}
            </option>
          </select>
        </base-input>

        <base-input class="col-md-3" label="Responsable de la Actividad">
          <select id="inputState" class="form-control" v-model="tipoResponsable">
            <option selected>Seleccione...</option>
            <option v-for="responsable in tiposResponsables" :key="responsable.id" :value="responsable.id">
              {{responsable.nombre}}
            </option>
          </select>
        </base-input>

        <div class="col-md-4 px-md-1">
          <base-input label="Nombre Responsable"
            placeholder="Nombre"
            v-model="model.nombreResponsable">
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input>
            <label>Descripción de la actividad</label>
            <textarea rows="4" cols="80"
              class="form-control"
              placeholder="Descripción"
              v-model="model.description">
            </textarea>
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3 pr-md-1">
          <base-input label="Ciudad"
            v-model="model.city"
            placeholder="Ciudad">
          </base-input>
        </div>
        <div class="col-md-4 pr-md-1">
          <base-input label="Pais"
            v-model="model.pais"
            placeholder="Pais">
          </base-input>
        </div>
        <div class="col-md-4 pr-md-1">
          <base-input label="Cantidad de estudiantes participando"
            v-model="model.numEstudiantes"
            placeholder="número de estudiantes"
            type="number">
          </base-input>
        </div>
        <div class="col-md-3 pr-md-1">
          <base-input label="Cantidad de docentes participando"
            v-model="model.numDocentes"
            placeholder="número de docentes"
            type="number">
          </base-input>
        </div>
        <div class="col-md-4 pr-md-1">
          <base-input label="Cantidad de personas participando"
            v-model="model.numPersonas"
            placeholder="número de personas"
            type="number">
          </base-input>
        </div>
        <div class="col-md-4 pr-md-1">
          <base-input label="Cantidad de personal administrativo"
            v-model="model.numAdministrativos"
            placeholder="número de administrativos"
            type="number">
          </base-input>
        </div>
        <div class="col-md-4 pr-md-1">
          <base-button size="sm" type="primary" @click="registrarActividad()">Registrar Actividad</base-button>
        </div>
      </div>

    </div>
    <div class="card-body all-icons">
      <div class="row">
      </div>
    </div>
  </div>
</template>
<script>
import Modal from "../components/Modal.vue"
export default {
  components: {
    Modal
  },
  methods: {
    alerta() {
      this.modals.modal0 = true;
    }
  },
  data() {
    return {
      radio: {
        radio1: "radio1",
        radio2: "radio3"
      },
      model: {
        description: '',
        newTipoAct: '',
        newTipoRes: ''
      },
      modals: {
        modal0: false,
        modal1: false
      },
      tiposActividades: [],
      tiposResponsables: [],
      tipoActividad: 'Seleccione...',
      tipoResponsable: 'Seleccione...',
    }
  },
  mounted() {
    this.consultarTiposDeActividades();
    this.consultarTiposDeResponsables();
  },
  methods: {
    consultarTiposDeResponsables() {
      this.axios.get(`${this.$store.state.api}api/tipoResponsable/all`)
      .then( (resp) => {
        const json = resp.data;
        const { data, status } = json;
        if (status === true) {
          this.tiposResponsables = data;
        }
      });
    },
    consultarTiposDeActividades() {
      this.axios.get(`${this.$store.state.api}api/tipoActividad/all`)
      .then( (resp) => {
        const json = resp.data;
        const { data, status } = json;
        if (status === true) {
          this.tiposActividades = data;
        }
      });
    },
    guardarTipoResponsable() {
      const responsable = this.model.newTipoRes;
      if (responsable) {
        this.axios.post(`${this.$store.state.api}api/tipoResponsable/create/${responsable}`)
        .then( (resp) => {
          const json = resp.data;
          const { data, status } = json;
          if (status === true) {
            this.tiposResponsables = data;
          }
        });
      }
      this.modals.modal1 = false;
      this.model.newTipoRes = '';
    },
    guardarTipoActividad() {
      const actividad = this.model.newTipoAct;
      if (actividad) {
        this.axios.post(`${this.$store.state.api}api/tipoActividad/create/${actividad}`)
        .then( (resp) => {
          const json = resp.data;
          const { data, status } = json;
          if (status === true) {
            this.tiposActividades = data;
          }
        });
      }
      this.modals.modal0 = false;
      this.model.newTipoAct = '';
    },
    registrarActividad() {
      console.log('responsable', this.tipoResponsable);
      console.log('activida t', this.tipoActividad);
      console.log('actividad', this.model);
    }
  }
};
</script>
<style>
select option {
  color:black;
}

</style>
