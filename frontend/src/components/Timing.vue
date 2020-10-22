<template>
    <span v-html="this.text()"></span>
</template>
<script lang="ts">
import { Vue } from 'vue-class-component'
import * as time from '../util/time'
import { ExternalSchedualLoader } from 'chronos-time'

export default class Timings extends Vue {
  timingData: time.TimeInfo = {timeLeft: "n/a", currentPeriodName: "n/a", nextPeriodName: "n/a"}
  timing!: (selected?: number) => time.TimeInfo
  int: number | null = null
  s: ExternalSchedualLoader | null = null

  zN = (n: number) => n < 10 ? "0" + n : "" + n

  public mounted() {
    // this.timing = time.run()
    // this.timingData = this.timing()
    // this.int = setInterval((() => {this.timing = time.run(); this.timingData = this.timing()}).bind(this), 1000)
    this.s = new ExternalSchedualLoader(  "https://chronoshhs.herokuapp.com/hhs", "https://chronoshhs.herokuapp.com/HHSTodayIs")
    
setInterval((() => {
  console.log(this.s?.currentTimeLeft, this.s?.currentName, this.s?.nextName, this.s?.currentTag);
  let temp = ""
  if(typeof this.s?.currentTimeLeft != "string")
    temp = (this.s?.currentTimeLeft || [0,0,0]).map(this.zN).join(":")
  else 
    temp = this.s?.currentTimeLeft
  this.timingData = {
    timeLeft: temp,
    currentPeriodName: this.s?.currentName || "N/A",
    nextPeriodName: this.s?.nextName || "N/A" 
  }
}).bind(this), 1000)}

  public beforeUnmount() {
    if(this.int != null)
      clearInterval(this.int)
  }

  public text() {
      // return `<i>Current: ${this.s?.currentName}, Next: ${this.s?.nextName}</i><br><span id="time" style="font-size: 1.5em;">${this.s?.currentTimeLeft}</span>`
      return `<i>Current: ${this.timingData.currentPeriodName}, Next: ${this.timingData.nextPeriodName}</i><br><span id="time" style="font-size: 1.5em;">Time Left: ${this.timingData.timeLeft}</span>`
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