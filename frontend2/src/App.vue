<template>
  <!-- <div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div> -->

  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { STORE } from './utils/storeType' 
import { state } from './store/store'

export default class Main extends Vue {
  $store!: STORE

  public mounted() {
    const data = localStorage.getItem("SETTINGS")
    if(data != null && data != undefined && data.length > 2)
      this.$store.commit("updateEntireState", JSON.parse(data))
    else 
      localStorage.setItem("SETTINGS", JSON.stringify(state))
  }

  // public beforeUnmount() {
  //   const a = ({...this.$store})
  //   localStorage.setItem("SETTINGS", JSON.stringify(a))
  // }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;1,300;1,400&display=swap');

body {
  margin: 0px;
}

button {
  &::selection { background:transparent; }
  outline: none;
}

#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

input[type="text"], input[type="number"] {
  // width: 100px;
  padding: 2px 5px;
  border-radius: 10px;
  border-color: #ffffff00;
}
</style>
