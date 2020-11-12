<template>
  <footer class="footer">
    <div class="container-fluid">
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link" href="http://www.creative-tim.com">
            Ing Sistemas Manuel Florez
          </a>
        </li>
        <!--
        <li class="nav-item">
          <a class="nav-link" href="http://blog.creative-tim.com">
            Blog
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://www.creative-tim.com/license">
            Licenses
          </a>
        </li>
        -->
      </ul>
      <div class="copyright">
        © {{year}} hecho con <i class="tim-icons icon-heart-2"></i> por
        <a href="https://www.facebook.com/ManuelFlorezw/" target="_blank" rel="noopener">Manuel Florez</a>
        <!--&nbsp;&
        <a href="https://www.creative-tim.com" target="_blank" rel="noopener">Creative Tim</a> for a better web.
        -->
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
    data() {
      return {
        year: new Date().getFullYear()
      }
    }
  };
</script>
<style>
</style>
