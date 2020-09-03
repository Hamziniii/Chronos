<template>
  <div id="app" :style="info">
    <div id="middle">
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from './components/HelloWorld.vue';
import { getColor } from './util/color'

@Options({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
  op = 1
  colors: [string, string] = this.op == 1 ? ["#667eea", "#764ba2"] : ["#cfd9df", "#e2ebf0"]// This is where you would get custom colors

  get info() {
    // linear-gradient(to right, orange , yellow, green, cyan, blue, violet)
    // linear-gradient(45deg, ${this.colors[0]} 0%, ${this.colors[1]} 100%)
    return `
      background: linear-gradient(45deg, yellow, green, cyan, blue, violet);
      color: ${getColor(this.colors[1])};
      background-size: 300% 300%;
      animation: AnimationName 60s ease infinite;
    `
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;1,300;1,400&display=swap');
@import 'util/app_media';

body {
  margin: 0px;
  padding: 0px;
}

#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  height: 100vh;
  width: 100vw;
  
  text-align: center;

  display: grid;
  grid-template: 1fr 5fr 1fr / 1fr 5fr 1fr;

  #middle {
    grid-area: 2 / 2;

    @keyframes AnimationName {
      0%{background-position:0% 50%}
      50%{background-position:100% 50%}
      100%{background-position:0% 50%}
    }
  }
}
</style>
