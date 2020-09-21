<template>
  <div id="app" :style="info">
    <div id="middle" :style="gridStyle">
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
      <Timing />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from './components/HelloWorld.vue';
import Timing from './components/Timing.vue'
import { getColor } from './util/color'

@Options({
  components: {
    HelloWorld,
    Timing
  },
})
export default class App extends Vue {
  op = 1
  public colors: [string, string] = this.op == 1 ? ["#667eea", "#764ba2"] : ["#cfd9df", "#e2ebf0"]// This is where you would get custom colors
  gridS = ``

  get info() {
    // linear-gradient(to right, orange , yellow, green, cyan, blue, violet)
    // linear-gradient(45deg, ${this.colors[0]} 0%, ${this.colors[1]} 100%)
    // let list = ["red", "orange", "yellow", "green", "blue", "violet"]
    return `
      background: linear-gradient(45deg, ${this.colors}) repeat;
      color: ${getColor(this.colors[1])};
      background-size: 100% 100%;
      animation: AnimationName 30s ease infinite;
    `
  }

  get gridStyle() {
    return this.gridS
  }

  public beforeMount() {
    this.gridS = `display: grid; grid-template: ${document.getElementById("middle")?.childElementCount != 1 ? `auto 1fr` : `1fr`} / 1fr; row-gap: 50px`;
  }

  public mounted() {
    (this.$el as HTMLElement)?.style.setProperty("--mode", getColor(this.colors[1]) + "b6")
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
  --mode: #fff;

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
    height: 100%;

    @keyframes AnimationName {
      0%{background-position:0% 50%}
      50%{background-position:100% 50%}
      100%{background-position:0% 50%}
    }

    #text {
      text-align: center;
      #time {
        font-size: 1.5em;
      }
    }
  }
}
</style>
