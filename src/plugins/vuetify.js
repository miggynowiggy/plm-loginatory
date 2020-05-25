import Vue from "vue";
import Vuetify from "vuetify/lib";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import colors from 'vuetify/lib/util/colors';
import store from "@/store";

var labDetails = store.getters.GET_CURRENT_LAB || {};
var primaryColor = labDetails.primaryColor || null;
var secondaryColor = labDetails.secondaryColor || null;

if(!primaryColor) {
  primaryColor = "#D1243A";
}

if(!secondaryColor) {
  secondaryColor = "#498B98";
}

console.log(labDetails);

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "md" || "fa"
  },
  theme: {
    themes: {
      light: {
        primary: "#D1243A", /*colors.red.darken2*/
        secondary: "#498B98",
        accent: "#FFC857",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
      }
    }
  }
});
