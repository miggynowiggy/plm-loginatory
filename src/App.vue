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
  mounted() {
    // const lab = this.$store.state.currentLab;
    // if(!lab) {
    //   this.$router.push('/');
    // }
    // else {
    //   this.$router.push('/read');
    // }
  },
  
  watch: {
    
  },

  computed: {
    
  },

  components: {
    
  },
  data: () => ({
    currentLab: {}
  })
};
</script>
