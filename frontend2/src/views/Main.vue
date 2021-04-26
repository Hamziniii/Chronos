<template>
  <div class="main" :style="$store.getters.mainBackground">
    <div id="background" :style="$store.getters.smoothingBackground"></div>
    <div id="timing" v-if="info.currentTimeLeft != 'N/A' || info.currentTimeLeft == undefined">
      <span id="info">
        <div id="left">
          <span v-if="$store.state.current">Current: {{ current }}<span v-if="$store.state.next">, </span></span> 
          <br>
          <span v-if="$store.state.next">Next: {{ next }}</span>
        </div>
        <div id="right">
          <span v-if="$store.state.time" id="date">{{pad(parseInt(month + 1))}}/{{pad(parseInt(day))}}/{{parseInt(year) - 2000}}<br></span>
          <!-- <br> -->
          <span v-if="$store.state.time" id="time">{{ time }}</span>
        </div>
      </span>
      <br>
      <span id="timeleft">{{ info.currentTimeLeft }}</span>
    </div>
    <div v-else id="center">
      <Clock :darkMode="true" :r1="50" :r2="20" :s="width > 520 ? '500px' : width - 20 + 'px'"></Clock>
    </div>
    
    <!-- <OauthLogin clientID="408077029007-b2j0stflkuace7jiquvc8glo17g9gir9" /> -->
    <!-- <div id="settings">
    </div> -->

    <router-link to="/settings" id="settings">
      <img v-if="$store.getters.contrastColor == 'black'" src="../assets/settings-black-18dp.svg" id="settings-img"> 
      <img v-else src="../assets/settings-white-18dp.svg" id="settings-img"> 
    </router-link>
  </div>
</template>
<!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import store from '../store/index'
import { state, mutations, getters, actions } from '../store/store'
import { ExternalSchedualLoader, SchedualManager, SchedualSettings } from 'chronos-time'
import Clock from '../components/Clock.vue'
import { Schedule } from '../../../frontend/src/util/time'
import OauthLogin from "../components/OauthLogin.vue";

// import HelloWorld from '@/components/HelloWorld.vue'
// import { mapMutations, mapState } from 'vuex'
  // components: {
    // HelloWorld,
  // },
  // computed: {
  //   ...mapState(["backgroundColors"])
  // }

@Options({name: "Main", components: {Clock, OauthLogin}})
export default class Main extends Vue {
  $store!: Exclude<typeof store, "state" | "mutations" | "actions" | "getters"> & {getters: typeof getters} & {state: typeof state} & {mutations: typeof mutations} & {actions: typeof actions}
  schedule!: ExternalSchedualLoader | SchedualManager
  interval!: number
  time = ""
  date = new Date()
  day = this.date.getDate()
  month = this.date.getMonth()
  year = this.date.getFullYear()
  info: {
    currentTimeLeft?: ExternalSchedualLoader["currentTimeLeft"],
    currentTag?: ExternalSchedualLoader["currentTag"],
    currentName?: ExternalSchedualLoader["currentName"],
    nextName?: ExternalSchedualLoader["nextName"],
    period: number,
    nextPeriod: number
  } = {currentTimeLeft: "N/A", period: 0, nextPeriod: 0}
  alerted = false
  width = 530

  addZero(n: number) {
    return (n > 9 ? "" : "0") + n
  }

  public mounted() {
      this.width = document.body.clientWidth
    // window.setInterval((()=>console.log(this.info.currentTimeLeft)).bind(this), 500)
    // if(this.$store.state.hhsSchedule || this.$store.state.schedules == null || this.$store.state.schedules == undefined || this.$store.state.schedules == [])
      function nothing() {1==1}
      function addDownTime(sch: SchedualSettings[]): SchedualSettings[] {
        return sch.map(s => {
          const oSch = s.timeSlots
          const nSch = oSch
          for(let i = 0; i < oSch.length - 1; i++) {
            if(oSch[i].end[0] == oSch[i+1].begin[0] && oSch[i].end[1] == oSch[i+1].begin[1])
              continue
            else
              nSch.splice(nSch.indexOf(oSch[i]) + 1, 0, {name: "Down Time", begin: oSch[i].end, end: oSch[i+1].begin, type: "passing"})
          }
          s.timeSlots = nSch
          return s
        })
      }
      if(this.$store.state.hhsSchedule)
        this.schedule = new ExternalSchedualLoader("https://chronoshhs.herokuapp.com/hhs", "https://chronoshhs.herokuapp.com/HHSTodayIs")
      else {
        this.schedule = new SchedualManager(addDownTime(this.$store.state.schedules[this.$store.state.usingSchedule].scheduals), nothing) 
        this.schedule.goToSchedual(new Date().toLocaleString('en-us', {  weekday: 'long' }).toLocaleLowerCase())

        // console.log(this.$store.state.schedules[this.$store.state.usingSchedule].scheduals, addDownTime(this.$store.state.schedules[this.$store.state.usingSchedule].scheduals))
      }
        //new ExternalSchedualLoader(/* this is custom data */, "https://chronoshhs.herokuapp.com/HHSTodayIs") 
        //this.schedule = // CUSTOM SCHEDULE localStorage.getItem("sessionId")

      // this.$store.state.schedules
    // else 
    //   this.schedule = new SchedualManager(this.$store.state.schedules[this.$store.state.usingSchedule])
    this.interval = window.setInterval((() => {
      const now = new Date()
      this.time =  [now.getHours() % 12 == 0 ? 12 : now.getHours() % 12, now.getMinutes(), now.getSeconds()].map(this.addZero).join(":") + " " + (now.getHours() < 12 || now.getHours() == 24 ? "AM" : "PM")
      ;({currentTimeLeft: this.info.currentTimeLeft, currentTag: this.info.currentTag, currentName: this.info.currentName, nextName: this.info.nextName} = this.schedule)
      this.info.currentTimeLeft = typeof this.info.currentTimeLeft != "string" ? (this.info.currentTimeLeft || [0,0,0]).map(this.addZero).join(":") : this.info.currentTimeLeft.replace("No schedule for", "Nothing")
      if(!this.alerted && typeof this.info.currentTimeLeft != "string" && ((this.info.currentTimeLeft[0] * 60 + this.info.currentTimeLeft[1]) + this.info.currentTimeLeft[2]) < 60) {
        this.alerted = true
        alert(":OOO less than 1 minute left")
      } else
        this.alerted = false
      document.title = this.info.currentTimeLeft
      if(this.schedule.currentName)
        this.info.period = parseInt(this.schedule.currentName.substring(0,1))
      if(this.schedule.nextName)
        this.info.nextPeriod = parseInt(this.schedule.nextName.substring(0,1))
    }).bind(this), 1000)
    this.schedule
  }

  public beforeUnmount() {
    if(this.interval)
      window.clearInterval(this.interval)
  }

  get current() {
    return this.info.currentName + (this.info.period > 0 && this.info.period < 9 && this.$store.state.hhsScheduleNames[this.info.period - 1] != null && this.$store.state.hhsScheduleNames[this.info.period - 1].length > 0 ? " - " +  this.$store.state.hhsScheduleNames[this.info.period - 1] : "")
  }
  get next() {
    return this.info.nextName + (this.info.nextPeriod > 0 && this.info.nextPeriod < 9 && this.$store.state.hhsScheduleNames[this.info.nextPeriod - 1] != null && this.$store.state.hhsScheduleNames[this.info.nextPeriod - 1].length > 0 ? " - " +  this.$store.state.hhsScheduleNames[this.info.nextPeriod - 1] : "")
  }

  pad(num: number) {
    return (num < 10 ? "0" : "") + num
  }
}
</script>

<style lang="scss" scoped>
  @keyframes AnimateBackground {
      0%{background-position:0% 50%}
      50%{background-position:100% 50%}
      100%{background-position:0% 50%}
  }

  .main {
    --color: white;
    display: grid; 
    grid-template: 1fr auto 1fr / 1fr auto 1fr;
    height: 100vh;
    width: 100vw;

    background-size: 130%;
    // background-color: #8BC6EC;
    // background-image: linear-gradient( 135deg,  #30cfd0 11.2%, #330867 92.5% );
    // background-image: linear-gradient( 135deg,  #36ebeb 11.2%, #330867 92.5% );
    animation: AnimateBackground 10s cubic-bezier(0.075, 0.82, 0.165, 1) infinite;

    #background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;

      opacity: .75;

      // background-image: url(data:image/png;base64,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);
      animation: AnimateBackground 15s cubic-bezier(0.075, 0.82, 0.165, 1) infinite;
    }

    #timing {
      z-index: 1;
      grid-area: 2 / 2;
      --shift: 17.5px;

      #info {
        color: var(--color);
        width: 97.5%;

        display: grid;
        grid-template: 1fr / auto 1fr auto; 

        float: left;
        font-style: italic;
        font-size: 1.25rem;
        text-align: left;

        position: relative;
        top: var(--shift);
        left: 10px;

        #left {
          grid-area: 1 / 1;
        }

        #right {
          grid-area: 1 / 3;
          text-align: right;
        }
      }

      #timeleft {
        color: var(--color);
        text-align: left;
        float:left;

        position: relative;
        bottom: var(--shift);
        box-sizing: content-box;
        font-size: 8rem;

        @media (max-width: 875px) {
          & {
            font-size: 6.5rem;
          }            
        }
        @media (max-width: 540px) {
          & {
            font-size: 5.5rem;
            bottom: calc(var(--shift) - .5rem);
          }            
        }
        @media (max-width: 400px) {
          & {
            font-size: 5rem;
            bottom: calc(var(--shift) - 1rem);
          }            
        }
      }
    }

    #settings {
      position: absolute;
      right: 40px;
      bottom: 40px;

      width: auto;
      height: auto;

      transition: transform .3s ease-in-out;

      &:hover {
        transform: scale(1.3);
      }

      @media (max-width: 400px) {
          & {
            right: calc(50% - 20px);
          }            
        }

      #settings-img {
        width: 40px;
        height: 40px;
        animation: pulse 6s infinite;
      }
    }

    @keyframes pulse {
      0% {
        transform: rotateZ(0);
      }
      70% {
        transform: rotateZ(360deg);
      }
    }

    #center {
      grid-area: 2 / 2;
    }

  }
</style>