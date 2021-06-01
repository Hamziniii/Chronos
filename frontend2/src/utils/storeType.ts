import store from '../store/index'
import {mutations, getters, actions} from '../store/store'

export type STORE = Omit<Omit<Omit<typeof store, "mutations"> & {mutations: typeof mutations}, "getters"> & {getters: typeof getters}, "actions"> & {actions: typeof actions} 