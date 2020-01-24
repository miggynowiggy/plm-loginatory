<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: "App",
  beforeUpdate() {
    const lab = this.$store.getters.GET_CURRENT_LAB;
    // console.log("FROM app", lab);
    if(!lab.labName || lab.labName === null || lab === undefined) {
      this.$router.push("/");
    }
  },

  computed: {
    lab() {
      return this.$store.getters.GET_CURRENT_LAB;
    }
  },

  data: () => ({
    currentLab: {}
  })
};
</script>

<style>
  @font-face {
    font-family: 'Avenir Next LT Pro';
    src: url('./assets/fonts/AvenirNextLTPro-Regular.otf') format('opentype');
    font-style: normal;
  }

  @font-face {
    font-family: 'Avenir Next LT Pro';
    src: url('./assets/fonts/AvenirNextLTPro-Bold.otf') format('opentype');
    font-style: bold;
  }

  @font-face {
    font-family: 'Avenir Next LT Pro';
    src: url('./assets/fonts/AvenirNextLTPro-It.otf') format('opentype');
    font-style: italic;
  }

</style>
