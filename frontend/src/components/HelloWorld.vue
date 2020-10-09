<template>
  <div class="clock">
    <div id="clock_outer" class="noselect">
      <div id="clock_analog_inner" v-if="this.type == 'analog'">
        <div id="inner" @click="this.change">
          <div class="dash" v-for="i in [0,1,2,3,4,5,6,7,8,9,10,11]" :key="i">{{i}}</div>
          <!-- <div id="hr" :style="`transform: rotate(${360 / 12 * (this.time[0] % 12) + 90 + 30 * (this.time[1] / 60)}deg)`"></div> -->
          <div id="hr" :style="`transform: rotate(${this.time[0]*360/12 + ((this.time[1] * 360/60)/12) + 90}deg)`"></div>
          <!-- <div id="min" :style="`transform: rotate(${360 / 60 * this.time[1] + 90 + 30 * (this.time[0] / 60)}deg)`"></div> -->
          <div id="min" :style="`transform: rotate(${(this.time[1] * 360/60) + (this.time[2] * 360/60)/60 + 90}deg)`"></div>
        </div>
      </div>
      <div id="clock_digital_inner" v-else  @click="this.change">
        <span id="text">{{this.time.map(t => Math.max(t, 10) == 10 && t != 10 ? "0" + t : t).map((t, i) => i == 0 ? t > 12 ? t - 12 : t : t).join(":")}} {{this.time[0] > 11 ? "PM" : "AM"}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    msg: String
  }
})
export default class HelloWorld extends Vue {
  type: ("analog" | "digital") = "analog"
  msg!: string
  time: [number, number, number] = [0,0,0]
  int: number | null = null
  run = function(this: {time: [number, number, number], run: () => void}) {
    const d = new Date(); (this.time as [number, number, number]) = [d.getHours(), d.getMinutes(), d.getSeconds()];
    window.requestAnimationFrame(this.run.bind(this))
  }

  public mounted() {
    // console.log((this.$parent?.$el as HTMLElement).id)
    this.dash()
    // this.int = setInterval((() => { }).bind(this), 1000)
    window.requestAnimationFrame(this.run.bind(this))
  }

  dash() {
    const dashes = document.getElementsByClassName("dash")
    for(let i = 0; i < dashes.length; i++)
      (dashes.item(i) as HTMLElement).style.transform = `rotate(${360 / 12 * parseInt(dashes.item(i)?.innerHTML || "0") + 90}deg)`
  }

  change() {
    this.type == 'analog' ? this.type = 'digital' : this.type = 'analog'
    if(this.type == 'analog')
      window.setTimeout(this.dash, 10)
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
  --acccent: #764ba2;
  // --acccent: #cfd9df;

  display: grid;
  grid-template: 1fr auto 1fr / 1fr auto 1fr;
  min-height: 35.714285714285715vh;

  #clock_digital_inner {
    grid-area: 3 / 2;
    font-size: calc(max(70vmin, 700px) / 8);
    display: grid;
    grid-template: 1fr auto;
    padding-top: 10px;
    #text {
      grid-area: 2 / 1;
    }

    @media screen and (max-width: 650px) {
      & {
        font-size: calc(80vmin / 8);
      }
    }
  }

  #clock_analog_inner { // 
    grid-area: 2 / 2;
    --size: #{'min(500px, 70vmin)'};

    // --mode2: #ffffff; //b6;
    // --mode: #000000b6;

    --mode: #ffffffb6; //b6;
    --mode2: #000000;

    width: var(--size);
    height: var(--size);
    background: var(--mode);
    border-radius: 50%;
    position: relative;
    
    &:before {
      --_size: calc(var(--size) * .05);
      content: '';
      display: flex;
      position: absolute;
      width: var(--_size);
      height: var(--_size);
      left: calc(50% - calc(var(--_size) / 2));
      top: calc(50% - calc(var(--_size) / 2));
      background: var(--acccent);
      border-radius: 50%;
      z-index: 1000000;
    }

    #inner {
      width: 100%;
      height: 100%;
      // background: rgba(0, 0, 255, 0.26);
      #hr {
        --w: calc(calc(var(--size) / 2) * .3);
        --h: 10px; 
        width: var(--w);
        height: var(--h);
        position: absolute;
        left:calc(50% - calc(var(--w)));
        top:calc(50% - calc(var(--h) / 2));
        transform-origin: right;
        background: var(--mode2);
        border: 1px solid none;
          &::before {
            content: " ";
            width: var(--h);
            height: var(--h);//var(--width);
            background: inherit;
            border-radius: 50%;
            position: absolute;
            left: calc(-1 * calc(var(--h) / 2));
          }
        &::after {
            content: " ";
            width: var(--h);
            height: var(--h);//var(--width);
            background: inherit;
            border-radius: 50%;
            position: absolute;
            right: calc(-1 * calc(var(--h) / 2));
          }
      }

      #min {
        --w: calc(calc(var(--size) / 2) * .6);
        --h: 10px; 
        width: var(--w);
        height: var(--h);
        position: absolute;
        left:calc(50% - calc(var(--w)));
        top:calc(50% - calc(var(--h) / 2));
        transform-origin: right;
        background: var(--mode2);
        // border: 1px solid none;
          &::before {
            content: " ";
            width: var(--h);
            height: var(--h);//var(--width);
            background: inherit;
            border-radius: 50%;
            position: absolute;
            left: calc(-1 * calc(var(--h) / 2));
          }
        &::after {
            content: " ";
            width: var(--h);
            height: var(--h);//var(--width);
            background: inherit;
            border-radius: 50%;
            position: absolute;
            right: calc(-1 * calc(var(--h) / 2));
          }
      }

      .dash {
        --w: calc(calc(var(--size) / 2) * .9);
        --h: 10px; 
        width: var(--w);
        height: var(--h);
        position: absolute;
        left:calc(50% - calc(var(--w)));
        top:calc(50% - calc(var(--h) / 2));
        transform-origin: right;
        color: transparent;

        &::before {
            content: " ";
            width: var(--h);
            height: var(--h);//var(--width);
            background: var(--acccent);
            border-radius: 50%;
            position: absolute;
            left: calc(-1 * calc(var(--h) / 2));
            opacity: .7;
        }
      }
    }
  }
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>
