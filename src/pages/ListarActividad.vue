<template>
    <div class="row">
      <div class="col-12">
        <card :title="table1.title">
          <div class="">
            <base-table :data="table1.data"
                        :columns="table1.columns"
                        thead-classes="text-primary">
            </base-table>
          </div>
        </card>
      </div>
      <!--
      <div class="col-12">
        <card class="card-plain">
          <div class="table-full-width table-responsive">
            <base-table :title="table2.title" :sub-title="table2.subTitle" :data="table2.data"
                         :columns="table2.columns">

            </base-table>
          </div>
        </card>
      </div>
      -->
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
  mounted() {
    this.axios.get(`${this.$store.state.api}api/user/all`).then( (resp) => {
      const json = resp.data;
      const { data, status } = json;
      if (status === true) {
        this.table1.data = [];
        data.forEach(element => {
          this.table1.data.push({
            nombre: element.nombres,
            email: element.correo,
            rol: element.rol,
            estado: element.estado
          });
        });
      }
    });
  }
};
</script>
<style>
</style>
