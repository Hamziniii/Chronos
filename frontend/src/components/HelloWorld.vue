<template>
  <div class="clock">
    <div id="clock_outer">
      <div id="clock_analog_inner" v-if="this.type == 'analog'">

      </div>
      <div id="clock_digital_inner" v-else>
        <span id="text">{{this.time.map(t => Math.max(t, 10) == 10 && t != 10 ? "0" + t : t).map((t, i) => i == 0 ? t > 12 ? t - 12 : t : t).join(":")}} {{this.time[0] > 12 ? "PM" : "AM"}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    msg: String
  }
})
export default class HelloWorld extends Vue {
  type: ("analog" | "digital") = "digital"
  msg!: string
  time: [number, number, number] = [0,0,0]
  int: number | null = null

  public mounted() {
    console.log((this.$parent?.$el as HTMLElement).id)
    this.int = setInterval((() => {const d = new Date(); this.time = [d.getHours(), d.getMinutes(), d.getSeconds()]}).bind(this), 1000)
  }

  public unmounted() {
    if(this.int)
      clearInterval(this.int)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#clock_outer {
  --acccent: #764ba2b6;

  display: grid;
  grid-template: 1fr auto 1fr / 1fr auto 1fr;
  min-height: 35.714285714285715vh;

  #clock_digital_inner {
    grid-area: 3 / 2;
    font-size: calc(50vh / 8);
    display: grid;
    grid-template: 1fr auto;
    padding-top: 10px;
    #text {
      grid-area: 2 / 1;
    }
  }

  #clock_analog_inner { // 
    grid-area: 2 / 2;
    --size: #{'min(500px, 70vmin)'};
    --mode: #ffffffb6;

    width: var(--size);
    height: var(--size);
    background: var(--mode);
    border-radius: 50%;

    &:before {
      --_size: calc(var(--size) * .05);
      content: '';
      display: block;
      position: relative;
      width: var(--_size);
      height: var(--_size);
      left: calc(50% - calc(var(--_size) / 2));
      top: calc(50% - calc(var(--_size) / 2));
      background: var(--acccent);
      border-radius: 50%;
      z-index: 1000000;
    }
  }
}
</style>
