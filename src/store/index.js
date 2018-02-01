// store的入口文件

import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import state from './state'
import createLogger from 'vuex/dist/logger'
//vuex的一个插件打印日志记录，上一状态prev state和下一状态next state(必须是mutations改变state时才有效)

Vue.use(Vuex)//注册插件

const debug = process.env.NODE_ENV !== 'production'//判断state是不是由mutations修改的

export default new Vuex.Store({
    actions,
    getters,
    mutations,
    state,
    strict:debug,
    plugins:debug ? [createLogger()] : []
<<<<<<< HEAD
})
=======
})
>>>>>>> e906022046d3dc4aad322e0b60498c14bbffba6f
