<template>
  <div class="clock">
    {{ msg }}
    <div id="clock_outer">
      <div id="clock_inner"></div>
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
  msg!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#clock_outer {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template: 1fr auto 1fr / 1fr auto 1fr;

  #clock_inner {
    grid-area: 2 / 2;

    width: 100px;
    height: 100px;
    background: #ffffffd5;
    border-radius: 50%;
  }
}
</style>
