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
    src: url('./assets/fonts/AvenirNextLTPro-Regular.ttf') format('truetype'),
         url('./assets/fonts/AvenirNextLTPro-Regular.woff') format('woff'),
         url('./assets/fonts/AvenirNextLTPro-Regular.woff2') format('woff2');
    font-style: normal;
  }

  @font-face {
    font-family: 'Avenir Next LT Pro';
    src: url('./assets/fonts/AvenirNextLTPro-Bold.ttf') format('truetype'),
         url('./assets/fonts/AvenirNextLTPro-Bold.woff') format('woff'),
         url('./assets/fonts/AvenirNextLTPro-Bold.woff2') format('woff2');
    font-style: bold;
  }

  @font-face {
    font-family: 'Avenir Next LT Pro';
    src: url('./assets/fonts/AvenirNextLTPro-It.ttf') format('truetype'),
         url('./assets/fonts/AvenirNextLTPro-It.woff') format('woff'),
         url('./assets/fonts/AvenirNextLTPro-It.woff2') format('woff2');
    font-style: italic;
  }

  @font-face {
    font-family: 'Avenir LT Std';
    src: url('./assets/fonts/AvenirNextLTPro-Bold.ttf') format('truetype'),
         url('./assets/fonts/AvenirNextLTPro-Bold.woff') format('woff'),
         url('./assets/fonts/AvenirNextLTPro-Bold.woff2') format('woff2');;
    font-style: bold;
  }

  @font-face {
    font-family: 'Avenir LT Std';
    src: url('./assets/fonts/AvenirLTStd-MediumOblique.otf') format('opentype');
    font-style: italic;
  }

</style>
