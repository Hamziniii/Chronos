<template>
<<<<<<< HEAD
  <div id="app" :style="info">
    <div id="middle" :style="gridStyle">
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
      <Timing />
    </div>
    <!-- <div id="changeButton"><img src="./assets/refresh.svg"></div> -->
=======
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
>>>>>>> master
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  }
<<<<<<< HEAD

  public beforeMount() {
    this.gridS = `display: grid; grid-template: ${document.getElementById("middle")?.childElementCount != 1 ? `auto 1fr` : `1fr`} / 1fr; row-gap: 50px`;
  }

  public mounted() {
    (this.$el as HTMLElement)?.style.setProperty("--mode", getColor(this.colors[1]) + "b6")

    
  }
}
=======
});
>>>>>>> master
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
