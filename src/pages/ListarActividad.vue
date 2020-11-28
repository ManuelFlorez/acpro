<template>
    <div class="row">
      <div class="col-12">
        <card :title="table1.title">
          <div class="">
            <base-table :data="table1.data"
                        :columns="table1.columns"
                        thead-classes="text-primary">
              <template slot="columns">
                <th class="text-center">Nombre</th>
                <th>Fecha</th>
                <th>Tipo Actividad</th>
                <th>Tipo Responsable</th>
                <th class="text-center">Opcones</th>
              </template>
              <template slot-scope="{row}">
                <td>{{row.nombre}}</td>
                <td>{{row.fecha}}</td>
                <td>{{row["tipo actividad"]}}</td>
                <td>{{row["tipo responsable"]}}</td>
                <td class="td-actions text-right">
                  <base-button @click="editar(row.id)" title="Editar" type="success" size="sm" icon>
                    <i class="tim-icons icon-settings"></i>
                  </base-button>
                  <span> - </span>
                  <base-button @click="eliminar(row.id)" title="Eliminar" type="danger" size="sm" icon>
                    <i class="tim-icons icon-simple-remove"></i>
                  </base-button>
                </td>
              </template>   
            </base-table>
          </div>
        </card>
      </div>
    </div>
</template>
<script>
import { BaseTable } from "@/components";
const tableColumns = ["Nombre", "Fecha", "Tipo Actividad", "Tipo Responsable"];
const tableData = [];

export default {
  components: {
    BaseTable
  },
  data() {
    return {
      table1: {
        title: "Mis Actividades",
        columns: [...tableColumns],
        data: [...tableData]
      },
      table2: {
        title: "Table on Plain Background",
        columns: [...tableColumns],
        data: [...tableData]
      }
    };
  },
  methods: {
    editar(id) {
      
    },
    eliminar(id) {
      this.axios.delete(`${this.$store.state.api}/actividad/delete/${id}`).then((resp) => {
        const json = resp.data;
        const { data, status } = json;
        if (status === true) {
          console.log('Exito: ' + data);
        } else {
          console.log('Error: ' + data);
        }
        this.cargarActividades();
      });
    },
    cargarActividades() {
      let user = JSON.parse(localStorage.getItem("user"));

      const usuarioId = user.id;
      this.axios.get(`${this.$store.state.api}/actividad/all/${usuarioId}`).then( (resp) => {
        const json = resp.data;
        const { data, status } = json;
        if (status === true) {
          this.table1.data = [];
          data.forEach(element => {
            this.table1.data.push({
              nombre: element.nombre,
              fecha: element.fecha.split('T')[0],
              'tipo actividad': element.tipoActividad.nombre,
              'tipo responsable': element.tipoResponsable.nombre,
              id: element.id
            });
          });
        }
      });
    }
  },
  mounted() {
    this.cargarActividades();
  }
};
</script>
<style>
</style>
