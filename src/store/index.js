import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:[],
    currentUser:{},
    toShow:"",
    showProfile:false,
    authenticated: false,
    userCoord:{}
  },
  mutations: {
    setAuthentication(state,status){
      state.authenticated=status;
    },
    setCurrentCoord(state, position){
      state.userCoord=position;
    },
    setUser(state,user){
      state.user.forEach((item, i) => {
        if(item.username==user.username && item.password==user.password){
          state.currentUser=item;
          console.log(state.currentUser);
        }
      });

    },
  },
  actions: {
  },
  modules: {
  }
})
