<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/docente/registrar_actividad" :name="$t('sidebar.notifications')" icon="tim-icons icon-notes"/>
        <sidebar-link to="/docente/listar_actividad" :name="$t('sidebar.typography')" icon="tim-icons icon-align-center"/>
        <sidebar-link to="/docente/profile" :name="$t('sidebar.userProfile')" icon="tim-icons icon-single-02"/>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
