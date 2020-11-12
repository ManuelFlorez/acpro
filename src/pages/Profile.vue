<template>
  <div class="row">
    <div class="col-md-8">
      <edit-profile-form :model="model">
      </edit-profile-form>
    </div>
    <div class="col-md-4">
      <user-card :user="user"></user-card>
    </div>
  </div>
</template>
<script>
  import EditProfileForm from './Profile/EditProfileForm';
  import UserCard from './Profile/UserCard'
  export default {
    components: {
      EditProfileForm,
      UserCard
    },
    data() {
      return {
        model: {
          company: 'admin@ufps.edu.co',
          email: 'admin@ufps.edu.co',
          username: 'admin',
          firstName: 'Manuel',
          lastName: 'Florez',
          address: ' #0- a Avenida Gran Colombia No. 12E-96, Cúcuta, Norte de Santander',
          city: 'Cúcuta',
          country: 'Colombia',
          about: 'Administrador: sistema actividades del programa de ingeniería de sistemas.'
        },
        user: {
          fullName: 'Manuel Florez',
          title: 'Decano Facultad',
          description: `Me he desempeñado como decano de la facultad de ingeniería desde el año 2050 y estoy a cargo de los grupos de investigación GIDIS y REDIS`,
        }
      }
    },
    methods: {
      consultarPerfil() {
        let user = JSON.parse(localStorage.getItem("user"));
        this.perfil(user.correo);
        user = JSON.parse(localStorage.getItem("user"));
        this.model.company = user.correo;
        this.model.email = user.correo;
        this.model.username = user.username;
        this.model.firstName = user.nombres;
        this.model.lastName = user.apellidos;
        this.model.address = user.direccion;
        this.model.city = user.ciudad;
        this.model.country = user.pais;
        this.model.about = user.descripcion;
      },
      perfil(correo) {
        this.axios.get(`${this.$store.state.api}api/user/email/${correo}`)
        .then( (resp) => {
          const json = resp.data;
          const { data, status } = json;
          if (status === true) {
            localStorage.setItem("user", JSON.stringify(data));
          }
        });
      }
    },
    mounted() {
      this.consultarPerfil();
    }
  }
</script>
<style>
</style>
