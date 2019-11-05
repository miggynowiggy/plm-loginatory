import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import LandingLogin from "./views/LandingLogin.vue";
import ReasonEncoding from "./views/ReasonEncoding.vue";
import ConfirmEntry from "./views/confirmEntrance.vue";
import ConfirmExit from "./views/confirmExit.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/read",
      name: "landingLogin",
      component: LandingLogin,
    },
    {
      path: "/reason",
      name: "reasonEncoding",
      component: ReasonEncoding,
    },
    {
      path: "/confirmEntry",
      name: "confirmEntry",
      component: ConfirmEntry,
    },
    {
      path: "/confirmExit",
      name: "confirmExit",
      component: ConfirmExit,
    },
  ]
});
