import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import LandingLogin from "./views/LandingLogin.vue";
import ReasonEncoding from "./views/ReasonEncoding.vue";
import ConfirmEntry from "./views/confirmEntrance.vue";
import BorrowItem from "./views/borrowItem.vue";
import ReturnItem from "./views/returnItem.vue";
import PrintReceipt from "./views/printReciept.vue";

import Dashboard from "./views/AdminView/dashboard.vue";
import VisitorsView from "./views/AdminView/visitorsView.vue";
import Inventory from "./views/AdminView/inventory.vue";
import Transactions from "./views/AdminView/borrowersTransactions.vue";

import Support from "./views/support.vue";

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
      path: "/borrowItem",
      name: "borrowItem",
      component: BorrowItem
    },
    {
      path: "/print",
      name: "printReciept",
      component: PrintReceipt
    },
    {
      path: "/returnItem",
      name: "returnItem",
      component: ReturnItem
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/visitorsView",
      name: "visitorsView",
      component: VisitorsView,
    },
    {
      path: "/inventory",
      name: "inventory",
      component: Inventory,
    },
    {
      path: "/borrowersTransaction",
      name: "borrowersTransactions",
      component: Transactions,
    },
    {
      path: "/support",
      name: "support",
      component: Support,
    }
  ]
});
