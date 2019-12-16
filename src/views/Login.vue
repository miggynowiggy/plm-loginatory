<!--LOGIN.VUE-->
<template>
  <v-container fluid fill-height>
    <v-layout row wrap align-center justify-center class="textHeader">
      <v-overlay value="true" z-index="-1">
        <v-img 
          :src="require('@/assets/plm2.jpg')"
          alt="plmBG"
          gradient="to top right, rgba(200,36,58,.33), rgba(217,27,44,.7)"
          height="100vh"
          width="100vw"
        ></v-img>
      </v-overlay>

      <v-flex xs12 md3>
        <v-card 
          height="300px" 
          class="primary"
          outlined
          tile
          raised
        >
          <div class="mt-4 pa-3">
            <v-layout row align-center justify-center>
              <v-flex md4 xs4>
                <v-avatar
                  size="120"
                >
                  <v-img 
                    :src="require('@/assets/plmlogo.png')" 
                    alt="plmLogo"
                    class="elevation-6"
                  ></v-img>
                </v-avatar>
              </v-flex>
            </v-layout>

            <v-layout row align-center justify-center mt-4>
             <v-flex xs9>
              <div class="title text-center font-weight-bold white--text">LOGIN-ATORY</div>   
             </v-flex> 
            </v-layout>

            <v-layout row px-3 mt-2>
              <v-flex xs12 class="body-1 text-center white--text font-italic">
                PLM's Login and Inventory System for Laboratories
              </v-flex>  
            </v-layout>
          </div>
        </v-card>
      </v-flex>

      <v-flex md4>
        <v-card 
          height="300px" 
          class="grey lighten-5 pa-3"
          outlined
          tile
          raised
        >
          
          <v-card-title>
            <v-layout row align-center justify-center>
              <v-flex xs4 class="text-center font-weight-bold primary--text">
                ROLE LOGIN
              </v-flex>
            </v-layout>
          </v-card-title>
          
          <v-card-text>
            
            <v-form @submit.prevent="login">
              <v-layout row wrap align-center justify-center>
                
                <v-flex xs10>
                  <v-text-field label="Username" v-model="username"></v-text-field>    
                </v-flex>

                <v-flex xs10>
                  <v-text-field 
                    label="Password" 
                    v-model="password"
                    :append-icon="toggle ? 'visibility_off' : 'visibility'"
                    :type="toggle ? 'text' : 'password'"
                    @click:append="toggle = !toggle"
                  ></v-text-field>    
                </v-flex>

                <v-flex xs10 mt-3>
                  <v-btn 
                    color="primary " 
                    depressed block 
                    type="submit"
                    :disabled="username === '' || password === '' || btnLoading"
                    :loading="btnLoading"
                  >LOGIN</v-btn>    
                </v-flex>

              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog" width="350px">
      <v-card>
        <v-card-title class="primary">
          <p class="text-center font-weight-bold white--text">ERROR</p>
        </v-card-title>
        <v-card-title>
          <p class="text-center">Incorrect Username or Password</p>
          <p class="text-center">Please double check details</p>
        </v-card-title>
        <v-card-actions>
          <v-btn block color="primary" @click="dialog = !dialog">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import plmLogo from "@/assets/plmlogo.png";
import plmBG from "@/assets/plm2.jpg";
import http from "../http-common";

export default {
  mounted() {
  },
  data: () => ({
    toggle: false,
    btnLoading: false,
    dialog: false,
    username: '',
    password: '',
  }),

  methods: {
    login() {
      this.btnLoading = true;

      const credentials = {
        username: this.username,
        password: this.password
      };

      http
        .post("labs/login", JSON.stringify(credentials))
        .then((labDetails) => {
          this.$store.commit("SET_LAB_ACCOUNT", labDetails.data);
          this.$router.push({name: 'landingLogin'});
          this.btnLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.btnLoading = false;
          this.dialog = true;
        });
    }  
  },
};
</script>

<style scoped>
  #picHeader {
    position: absolute;
    left: 0px;
    top: -163px;
    z-index: 0;
    height: 100vh;
    width: 100vw;
  } 

  .textHeader {
    z-index: 3;
    margin-top: 1.5em;
  }
</style>
