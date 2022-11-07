<template>
  <div id="app">
    <topnav class="app_topnav" />
    <router-view class="app_routerview" />
  </div>
</template>

<script>
  import topnav from "./components/GlobalComponent/TopNav.vue";

  export default {
    name: "App",
    components: {
      topnav,
    },

    data() {
      return {};
    },

    methods: {},
  };
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  ul {
    list-style: none;
  }

  body {
    background-size: cover;
  }

  @media screen and (max-width: 1024px) {
    html {
      font-size: 50px !important;
      /*一定要加!important*/
    }
  }

  @media screen and (min-width: 1920px) {
    html {
      font-size: 100px !important;
      /*一定要加!important*/
    }
  }
</style>