<template>
    <span v-html="this.text()"></span>
</template>
<script lang="ts">
import { Vue } from 'vue-class-component'
import * as time from '../util/time'

export default class Timings extends Vue {
  timingData: time.TimeInfo = {timeLeft: "n/a", currentPeriodName: "n/a", nextPeriodName: "n/a"}
  timing!: (selected?: number) => time.TimeInfo
  int: number | null = null

  public mounted() {
    this.timing = time.run()
    this.timingData = this.timing()
    this.int = setInterval((() => {this.timing = time.run(); this.timingData = this.timing()}).bind(this), 1000)
  }

  public beforeUnmount() {
    if(this.int != null)
      clearInterval(this.int)
  }

  public text() {
      return `<i>Current: ${this.timingData.currentPeriodName}, Next: ${this.timingData.nextPeriodName}</i><br><span id="time" style="font-size: 1.5em;">${this.timingData.timeLeft}</span>`
  }
}

</script>
<style lang="scss" scoped>
#text {
    text-align: center;
}

#time {
  font-size: 1.5em;
}
</style>