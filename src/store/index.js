import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store =  new Vuex.Store({
  state: {
    //   userList:[{}]
  },
  mutations: {
	//   changeUserList(state, userList) {
	// 	state.userList = userList
	//   }
  },
  actions: {
	// commitChangeUserList:({commit}, userList) => commit('changeUserList',userList)
  },
  modules: {

  }
})
