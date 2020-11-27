<template>
  <div>

  <div class="card">
    <div class="card-header">
      <h5 class="title">Paquete de Actividades</h5>
      <div class="row">
        <base-input class="col-md-4">
          <select id="inputState" class="form-control" v-model="paquete">
            <option>Seleccione...</option>
            <option v-for="item in paquetes" :key="item.id" :value="item.id">
              {{item.nombre}}
            </option>
          </select>
        </base-input>
        <div class="col-md-4">
          Agregar <a href="#/admin/registrar_actividad" @click="modals.modal2 = true">Nuevo Paquete</a>
        </div>
        <modal :show.sync="modals.modal2" :centered="false">
          <template slot="header">
            <h5 class="modal-title" id="exampleModalLabel">Registrar Paquete</h5>
          </template>
          
            <div>
              <label style="color:black">Nombre del Paquete</label>
              <input label="Ciudad"
                v-model="model.newPaquete"
                placeholder="paquete"
                style="width:100%; border-bottom: black solid; border-top:none; border-left:none; border-right:none;" />
              
            </div>

          <template slot="footer">
            <base-button type="secondary" @click="modals.modal2 = false">Cancelar</base-button>
            <base-button type="primary" @click="guardarPaquete()">Guardar</base-button>
          </template>
        </modal>
      </div>
    </div>
  </div>

  <div class="card" v-if="paquete !== 'Seleccione...'">
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
        <div class="col-md-11">
          <base-input label="Nombre de Actividad"
            placeholder="Nombre"
            v-model="model.nombre"
            type="text">
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3">
          <base-input label="Fecha"
            placeholder="Fecha del evento"
            v-model="model.fecha"
            type="date">
          </base-input>
        </div>
      </div>
      <hr>

      <div class="row">
        <div class="col-md-12">
          <base-input>
            <label>Descripción de la actividad</label>
            <textarea rows="4" cols="80"
              class="form-control"
              placeholder="Descripción"
              v-model="model.descripcion">
            </textarea>
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3 pr-md-1">
          <base-input label="Ciudad"
            v-model="model.ciudad"
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
            v-model="model.numeroEstudiantes"
            placeholder="número de estudiantes"
            type="number">
          </base-input>
        </div>
        <div class="col-md-3 pr-md-1">
          <base-input label="Cantidad de docentes participando"
            v-model="model.numeroDocentes"
            placeholder="número de docentes"
            type="number">
          </base-input>
        </div>
        <div class="col-md-4 pr-md-1">
          <base-input label="Cantidad de personas participando"
            v-model="model.numeroPersonas"
            placeholder="número de personas"
            type="number">
          </base-input>
        </div>
        <div class="col-md-4 pr-md-1">
          <base-input label="Cantidad de personal administrativo"
            v-model="model.numeroPersonasAdministrativo"
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

  <modal :show.sync="modals.modal3">
      <h6 slot="header" class="modal-title" id="modal-title-default">Exito</h6>

      <p>{{ modals.msg }}</p>

      <template slot="footer">
        <!-- <base-button type="primary">Save changes</base-button> -->
        <base-button type="secondary" class="ml-auto" @click="verActividades()">Cerrar
          </base-button>
        </template>
    </modal>

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
        newTipoRes: '',
        newPaquete: ''
      },
      modals: {
        modal0: false,
        modal1: false,
        modal2: false,
        modal3: false
      },
      tiposActividades: [],
      tiposResponsables: [],
      paquetes: [],
      tipoActividad: 'Seleccione...',
      tipoResponsable: 'Seleccione...',
      paquete: 'Seleccione...'
    }
  },
  mounted() {
    this.consultarTiposDeActividades();
    this.consultarTiposDeResponsables();
    this.consultarPaquetes();
  },
  methods: {
    verActividades() {
      modals.modal3 = false;
      this.$router.push('/admin/listar_actividad');
    },
    consultarPaquetes() {
      this.axios.get(`${this.$store.state.api}/paquete/all`)
      .then( (resp) => {
        const json = resp.data;
        const { data, status } = json;
        if (status === true) {
          this.paquetes = data;
        }
      });
    },
    consultarTiposDeResponsables() {
      this.axios.get(`${this.$store.state.api}/tipoResponsable/all`)
      .then( (resp) => {
        const json = resp.data;
        const { data, status } = json;
        if (status === true) {
          this.tiposResponsables = data;
        }
      });
    },
    consultarTiposDeActividades() {
      this.axios.get(`${this.$store.state.api}/tipoActividad/all`)
      .then( (resp) => {
        const json = resp.data;
        const { data, status } = json;
        if (status === true) {
          this.tiposActividades = data;
        }
      });
    },
    guardarPaquete() {
      const paquete = this.model.newPaquete;
      if (paquete) {
        this.axios.post(`${this.$store.state.api}/paquete/create/${paquete}`)
        .then( (resp) => {
          const json = resp.data;
          const { data, status } = json;
          if (status === true) {
            this.paquetes = data;
          }
        });
      }
      this.modals.modal2 = false;
      this.model.newPaquete = '';
    },
    guardarTipoResponsable() {
      const responsable = this.model.newTipoRes;
      if (responsable) {
        this.axios.post(`${this.$store.state.api}/tipoResponsable/create/${responsable}`)
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
        this.axios.post(`${this.$store.state.api}/tipoActividad/create/${actividad}`)
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
      let user = JSON.parse(localStorage.getItem("user"));

      const usuarioId = user.id;
      const tipoActividadId = this.tipoActividad;
      const tipoResponsableId = this.tipoResponsable;
      const paqueteId = this.paquete;
      const {
        nombreResponsable,
        descripcion,
        ciudad,
        pais,
        numeroEstudiantes,
        numeroDocentes,
        numeroPersonas,
        numeroPersonasAdministrativo,
        fecha,
        nombre
      } = this.model;
      this.axios.post(`${this.$store.state.api}/actividad/create`, {
        usuarioId,
        paqueteId,
        tipoActividadId,
        tipoResponsableId,
        nombreResponsable,
        descripcion,
        ciudad,
        pais,
        numeroEstudiantes,
        numeroDocentes,
        numeroPersonas,
        numeroPersonasAdministrativo,
        fecha,
        nombre
      })
      .then( (resp) => {
        const json = resp.data;
        const { data, status } = json;
        if (status === true) {
          this.modals.modal3 = true;
          this.modals.msg = data;
        }
      });
    }
  }
};
</script>
<style>
select option {
  color:black;
}

</style>
