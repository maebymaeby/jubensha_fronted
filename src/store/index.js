import Vue from 'vue'
import Vuex from 'vuex'

import Activity from "./modules/Activity";
import Admin from "./modules/Admin";
import User from "./modules/User";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Activity,
    Admin,
    User
  }
})