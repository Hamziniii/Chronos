<template>
  <div class="settings" :style="$store.getters.mainBackground">
    <Modal :show="isModalOpened" :backgroundColor="isModalBackgroundColors" :fields="modalData" @close="closeModal" :color="interpolateColor($store.state.backgroundColors[0], last($store.state.backgroundColors))" :title="modalTitle"></Modal>
    <div id="body" style="z-index: 2">
      <div id="left">
        <div v-for="(v, i) in views.filter(v => v != 'Home')" :key="v" id="category" :style="i == view ? 'background: ' + interpolateColor($store.state.backgroundColors[0], last($store.state.backgroundColors)) : ''" @click="view = i"><span>{{v}}</span></div>
      </div>
      <div id="right">
        <div id="title"><span id="titleText">Settings: {{views[view]}}</span></div>
        <div id="info" v-if="views[view] == 'Appearance'" style="overflow-x: visible; overflow-y: visible;"> <!-- MAKE SURE TO REMOVE WHEN MORE THINGS COME-->
          <span v-for="(v, i) in $store.getters.storeSettings" class="display" test='3' :tooltip="sI[v]?.tooltip" :key="KEYS[i]">{{sI[v]?.display}}: <FormElement :name="v" style="display: inline" :id="v" class="formElement" @edit-background-colors="modalForBackgroundColors"></FormElement><br></span>
        </div>
        <div id="info" v-else-if="views[view] == 'HHS Schedule'">
          <span v-for="(v) in [1,2,3,4,5,6,7,8]" :key="v">Period {{v}}: <input type="text" :value="$store.state.hhsScheduleNames[v-1]"></span>
        </div>
        <div id="info" v-else-if="views[view] == 'HHS Links'">
          <span v-for="(v) in [1,2,3,4,5,6,7,8]" :key="v">Period {{v}}: <input type="text" :value="$store.state.hhsScheduleLinks[v-1]"></span>
        </div>
        <div id="info" v-else-if="views[view] == 'Scheduling'">
          <Scheduling></Scheduling>
        </div>
        <div id="info" v-else-if="views[view] == 'Notifications'">
          <p>Not working yet, will work after scheduling is done</p>
          <p>Notifications: <FormElement :name="'notifications'" style="display: inline" class="formElement"></FormElement></p>
          <p>Alert: <FormElement :name="'timeBeforeNotification'" style="display: inline" class="formElement"></FormElement></p>
          <p>Sound Effects: None (to be added)</p>
        </div>
        <div id="info" v-else-if="views[view] == 'Data'">
          <div id="stuff" style="padding: 50px; height: calc(100% - 144px); grid-template: 1fr auto 1fr / 1fr auto auto auto 1fr; display: grid;">
            <div style="grid-area: 2 / 2; ">
              <img @click="upload" src="../assets/cloud_upload-white-18dp.svg" id="settings-img" style="width: 100px;">
              <span style="text-align: center;">Upload Data</span>
            </div>
            <div id="login" style="width: 50px; grid-area: 2/3;">
              <!-- <OauthLogin :clientID="'408077029007-b2j0stflkuace7jiquvc8glo17g9gir9'" ></OauthLogin> -->
            </div>
            <div style="grid-area: 2 / 4;">
              <img @click="download" src="../assets/cloud_download-white-18dp.svg" id="settings-img" style="width: 100px; place-self: start;">
              <span style="text-align: center;">Download Data</span>  
            </div>            
          </div>
        </div>
        <div id="info" v-else-if="views[view] == 'Account'">
            <div id="stuff" style="width: 100%; height: 100%; display: grid; grid-template: 1fr auto auto auto 1fr / 1fr auto 1fr; row-gap: 10px">
                <div style="grid-area: 2 / 2">Currently {{signedIn ? "Signed In" : "Signed Out"}}</div>
                <div style="grid-area: 3 / 2">Signed in as: {{signInData?.basicProfile?.Qt || "N/A"}}</div>
                <button style="grid-area: 4 / 2; width: 10vw; height: 3em; place-self: center; border-radius: 25px;" @click="sign">Sign {{signedIn ? "Out" : "In"}}</button>
            </div>
        </div>
        <div id="info" v-else-if="views[view] == 'Read Me!'">
          <p style="font-size: 1.3rem; margin-top: 0px">Here is the run down:</p>
          <p>1. After you change something, click save to save. If you need to reset, click reset.</p>
          <p>2. The spinning hour glass will take you back to the clock</p>
          <p>3. Head over to Scheduling to add in custom schedules</p>
          <p>4. To save and get data from the cloud, first sign-in in Account, then head to Data</p>
          <p>5. Sharing schedules coming soon</p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfzWUJPsyFX_HVq0Vjk7UnRLuatSB3-g4QTBy0Y0DPoLvfCKA/viewform" style="color: lightblue">6. If you want, please fill this feedback form</a>
        </div>
        <div id="home" v-else-if="views[view] == 'Home'">
          <div v-for="(v, i) in views.filter(v => v != 'Home')" :key="v" id="category" :style="i == view ? 'background: ' + interpolateColor($store.state.backgroundColors[0], last($store.state.backgroundColors)) : ''" @click="view = i"><span>{{v}}</span></div>
        </div>
        <div id="options"><button id="save" @click="update" :style="'--bg:' + interpolateColor($store.state.backgroundColors[0], last($store.state.backgroundColors))">Save</button><button id="reset" @click="reset" :style="'--bg: #' + 'ff0000'">Reset</button><button id="home" @click="home" :style="'--bg: #' + 'ffffff'">Home</button></div>
      </div>
      <!-- <span>This the settings page, current settings:</span>
      <span>{{$store.state.backgroundColors}}</span> -->
    </div>
    <!-- <p style="grid-area: 3 / 2">THIS IS STILL UNDER DEVELOPMENT, SUBJECT TO CHANGE</p> -->

    <router-link to="/" id="main">
      <img v-if="$store.getters.contrastColor == 'black'" src="../assets/hourglass_full-black-18dp.svg" id="settings-img"> 
      <img v-else src="../assets/hourglass_full-white-18dp.svg" id="settings-img"> 
    </router-link>
    <div id="background" :style="$store.getters.smoothingBackground" style="z-index: -1"></div>
  </div>
</template>

<script lang="ts">
import { ExternalSchedualLoader, SchedualManager, SchedualSettings } from "chronos-time";
import { Options, Vue } from "vue-class-component";
import OauthLogin from "../components/OauthLogin.vue"
import FormElement from "../components/FormElement.vue"
import Scheduling from "../components/Scheduling.vue"
import {STORE} from '../utils/storeType'
import Modal from '../components/Modal.vue'
import {Field} from '../components/Modal.vue'
import { StateInfo } from "../store/store";
import {DateTime} from 'luxon'


@Options({name: "Settings", components: {OauthLogin, FormElement, Scheduling, Modal}})
export default class Settings extends Vue {
  $store!: STORE
  sI = StateInfo
  views = ["Appearance", "Scheduling", "HHS Schedule", "Data", "Account", "Read Me!", "Home"] //["Appearance", "Notifications", "HHS Schedule", "Scheduling", "Read Me!"]
  view = this.views.indexOf("Read Me!")
  scheduling = "Unchanged - Using HHS Schedule"
  interval = -1
  schedule!: ExternalSchedualLoader | SchedualManager
  KEYS = [1,2,3,4,5,6,7,8]
  
  isModalOpened = false
  modalTitle = 'why'
  isModalBackgroundColors = false

  $gAuth: any
  signedIn = false
  signInData: {
    id?: string,
    basicProfile?: any, 
    authResponse?: string
  } = {}

  modalData: Field[] = [/**{
    name: "color",
    tooltip: "The color you want to be added",
    info: {
      type: "string",
      placeholder: "#ffffff",
      default: "children"
    }
  }, {
    name: "color",
    tooltip: "The color you want to be added",
    info: {
      type: "number",
      default: 123123,
      placeholder: "#ffffff",
    }
  }, {
    name: "color",
    tooltip: "The color you want to be added",
    info: {
      type: "color",
      default: "#333122",
      placeholder: "#ffffff",
    }
  }, {
    name: "color",
    tooltip: "The color you want to be added",
    info: {
      type: "time",
      default: "12:00",
      placeholder: "#ffffff",
    }
  }, {
    name: "color",
    tooltip: "The color you want to be added",
    info: {
      type: "boolean",
      default: false,
      placeholder: "#ffffff",
    }
  }**/]
  submittedModal?: Field[]
  onSubmit?: Function = console.log

  public async mounted() {
    let sessionId = ({id: ""})
    if((sessionId = JSON.parse(localStorage.getItem("sessionId") || "") ?? null) != null) {
      // const response = await fetch("https://chronoshhs.herokuapp.com/schedualCustomization/getCustom", {method: 'POST', mode: 'cors', headers: {'Content-Type': "application/json"}, body: JSON.stringify({sessionId: sessionId["id"] as string})}).then(data => data.text())
      const response = await fetch("https://chronoshhs.herokuapp.com/customTime/getScheduals", {method: 'POST', mode: 'cors', headers: {'Content-Type': "application/json"}, body: JSON.stringify({sessionId: sessionId["id"] as string})}).then(data => data.text())
      console.log(response)
    }

    function nothing() {1==1}
    if(this.$store.state.hhsSchedule)
      this.schedule = new ExternalSchedualLoader("https://chronoshhs.herokuapp.com/hhs", "https://chronoshhs.herokuapp.com/HHSTodayIs")
    else {
      this.schedule = new SchedualManager(this.$store.state.schedules[this.$store.state.usingSchedule].scheduals, nothing) 
      this.schedule.goToSchedual(new Date().toLocaleString('en-us', {  weekday: 'long' }).toLocaleLowerCase())
    }
    this.interval = window.setInterval((() => {
      if(this.schedule.currentTimeLeft)
        document.title = typeof this.schedule.currentTimeLeft == "string" ? this.schedule.currentTimeLeft : this.schedule.currentTimeLeft.map(t => (t < 10 ? "0" : "") + t).join(":")
    }).bind(this), 1000)
  }

  public beforeUnmount() {
    window.clearInterval(this.interval)
  }

  updateKeys() {
    this.KEYS = this.KEYS.map(_ => _ + this.KEYS.length)
  }

  update() {
    switch(this.views[this.view]) {
      case 'Appearance':
        document.querySelectorAll(".formElement").forEach(v => {
          const id = v.id as keyof STORE["state"]
          if(v.tagName == "BUTTON")
            this.$store.commit("updateState", [id, v.innerHTML == "true"])
          else if(v.tagName != "INPUT")
            this.$store.commit("updateState", [id, v.innerHTML == "n/a" ? null : v.innerHTML])
          else if(v["type"] && v["type"] == "number")
            this.$store.commit("updateState", [id, parseInt(v["value"])])
          else if(v["type"] && v["type"] == "text")
            this.$store.commit("updateState", [id, v["value"].split(", ").join("|").split(",").join("|").split("|")])
          else 
            console.log(v)
        })
      break
      case 'HHS Schedule':
        document.querySelectorAll("input").forEach((v, i) => {
          const data = this.$store.state.hhsScheduleNames
          data[i] = v.value
          this.$store.commit("updateState", ["hhsScheduleNames", data])
        })
      break
      case 'HHS Links':
        document.querySelectorAll("input").forEach((v, i) => {
          const data = this.$store.state.hhsScheduleLinks
          data[i] = v.value
          this.$store.commit("updateState", ["hhsScheduleLinks", data])
        })
      break
      default:
        console.log("POTATO CHIPS")
      break
    }

    localStorage.setItem("SETTINGS", JSON.stringify(this.$store.state))
  }

  reset() {
    if(confirm("Are you sure you want to reset everything?")) {
      this.$store.commit("reset")
      this.$forceUpdate()
    }
    this.updateKeys()
  }

  last = (arr: string[]) => arr[arr.length - 1]

  interpolateColor (colorA: string, colorB: string, amount = (this.$store.state.settingsColorPercent as number % 100 / 100)){
    const [rA, gA, bA] = colorA.match(/\w\w/g)!.map((c) => parseInt(c, 16));
    const [rB, gB, bB] = colorB.match(/\w\w/g)!.map((c) => parseInt(c, 16));
    const r = Math.round(rA + (rB - rA) * amount).toString(16).padStart(2, '0');
    const g = Math.round(gA + (gB - gA) * amount).toString(16).padStart(2, '0');
    const b = Math.round(bA + (bB - bA) * amount).toString(16).padStart(2, '0');
    return '#' + r + g + b;
  }

  closeModal(maybe, maybe2) {
    if(maybe != undefined && this.onSubmit)
      this.onSubmit(maybe, maybe2)
    this.isModalOpened = false
    this.isModalBackgroundColors
  }

  modalForBackgroundColors() {
    this.isModalBackgroundColors = true 
    this.modalTitle = 'Edit Background Colors'

    this.isModalOpened = true
    this.onSubmit = data => {
      this.$store.state.backgroundColors = data.map(d => d.value)
      localStorage.setItem("SETTINGS", JSON.stringify(this.$store.state))
    }
  }

  upload() {
    if(!this.signedIn) {
      alert("You are not signed in!")
      this.account()
      return
    }
    if(confirm("Are you sure you want to upload your data to the cloud? It will override the data over there."))
      fetch('https://chronoshhs.herokuapp.com/saveData', {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

          },
          body: JSON.stringify({sessionId: JSON.parse(localStorage.getItem('sessionId') as string).id, customization: JSON.parse(localStorage.getItem('SETTINGS') as string)})
      }).then(async r => alert(`Success: ${(await r.json() as any).success}`))
  }
  download() {
    if(!this.signedIn) {
      alert("You are not signed in!")
      this.account()
      return 
    }
    if(confirm("Are you sure you want to download your data from the cloud? It will override the data over here."))
      fetch('https://chronoshhs.herokuapp.com/getData', {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

          },
          body: JSON.stringify({sessionId: JSON.parse(localStorage.getItem('sessionId') as string).id})
      }).then(async r => {
        const data = await r.json()
        localStorage.setItem("SETTINGS", JSON.stringify((data as any).data))
        this.$store.commit("updateEntireState", data)
        window.location.reload()
      })
  }
  home() {
    this.view = this.views.indexOf("Home")
  }
  account() {
    this.view = this.views.indexOf("Account")
  }

  sign() {
    if(this.signedIn)
      this.signOut()
    else 
      this.signin()
  }

  async signin() {
    const temp = await this.$gAuth.signIn()
    console.log(temp)
    this.signedIn = true
    this.signInData = {
      id: temp.getId(),
      basicProfile: temp.getBasicProfile(),
      authResponse: temp.getAuthResponse()
    }

    if(localStorage.getItem('email') == null)
      localStorage.setItem('email', this.signInData.basicProfile.Qt)

    if (
      localStorage.getItem('email') != this.signInData.basicProfile.Qt ||
      localStorage.getItem("sessionId") == "undefined" ||
      localStorage.getItem("sessionId") == null ||
      DateTime.fromObject(JSON.parse(localStorage.getItem("sessionId") as string).expiresAt)
        .diffNow()
        .as("seconds") <= 0
    ) {
      fetch("https://chronoshhs.herokuapp.com/authenticate", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ accessToken: temp.qc.id_token })
        }).then(res => {
          res.json().then(json => {
            if (json.success) {
              localStorage.setItem("sessionId", JSON.stringify(json.sessionId));
            } else {
              throw "Auth Error:" + json.reason;
            }
          })
      })
    }

    localStorage.setItem('email', this.signInData.basicProfile.Qt)
  }

  async signOut() {
    this.$gAuth.signOut()
    this.signedIn = false
    this.signInData = {}
  }
}
</script>

<style lang="scss" scoped>
@keyframes pulse {
  0% {
    transform: rotateZ(0);
  }
  70% {
    transform: rotateZ(360deg);
  }
}

#main {
  position: absolute;
  right: 40px;
  bottom: 40px;

  width: auto;
  height: auto;

  transition: transform .3s ease-in-out;

  &:hover {
    transform: scale(1.3);
  }

  #settings-img {
    width: 40px;
    height: 40px;
    animation: pulse 6s infinite;
    display: hidden;
  }
}

.settings {
  --color: white;
  display: grid; 
  height: 100vh;
  width: 100vw;
  color: var(--color);

  background-size: 130%;
  // background-color: #8BC6EC;
  // background-image: linear-gradient( 135deg,  #30cfd0 11.2%, #330867 92.5% );
  // background-image: linear-gradient( 135deg,  #36ebeb 11.2%, #330867 92.5% );
  animation: AnimateBackground 15s cubic-bezier(0.075, 0.82, 0.165, 1) infinite;

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

  display: grid;
  grid-template: 1fr auto 1fr / 1fr auto 1fr;
}

// Fogin {
//   position: absolute;
//   bottom: 40px;
//   left: 40px;
// }

#body {
  grid-area: 2/2;
  --padding: 75px;
  --height: Min(550px, calc(100vh - var(--padding)));
  --width: Min(800px, calc(100vw - var(--padding)));
  height: var(--height);
  width: var(--width);
  border-radius: 35px;
  padding: calc(var(--padding) / 2);
  padding-left: 0px;

  display: grid;
  grid-template: 1fr / 1fr 3fr;

  background: #1e1e1eac;

  // @media (max-width: 850px) {
  //   & {
  //     transform: scale(.75);
  //     --width: Min(800px, calc(125vw - var(--padding)));
  //   }            
  // }

  @media (max-width: 715px) {
    & {
      grid-template: 1fr / 1fr;
      padding-left: calc(var(--padding) / 4);
      padding-right: calc(var(--padding) / 4);
    }            
  }

  @media (max-width: 425px) {
    font-size: .9rem;
  }

  #category {
    width: 100%;
    height: 70px;
    display: grid;
    grid-template: 1fr auto 1fr / 1fr auto 1fr;
    // padding-left: calc(var(--padding) / 2);

    span {
      grid-area: 2 / 2;
    }
  }
  #left {
    @media (max-width: 715px) {
      & {
        display: none;
      }            
    }
  }
  #right {
    display: grid;
    height: var(--height);

    grid-template: 1fr Calc(100% * 0.7) 1.3fr / 1fr;

    #title {
      display: grid;
      grid-template: 1fr auto 1fr / 1fr auto 1fr;
      
      #titleText {
        grid-area: 2 / 2;
        font-size: 1.5rem;
      }
    }

    #info {
      // margin-top: 20px;
      position: relative;
      z-index: 5;
      min-height: 0;
      span {
        display: block;
        padding: 10px;
        &:last-of-type {
          padding-bottom: 0px;
        }
      }
      .display {
        position: relative;
      }
      .display::before {
        display: none;
        content: attr(tooltip);
        position: absolute;
        bottom:  -50%; //2.5em;
        --width: 120px;
        --padding: 10px;
        left:  70.5%; //calc(50% - calc(calc(var(--width) + var(--padding)) / 2));
        // margin-left: -12px;
        // margin-top: -12px;
        // background: black;
        // border-style: solid;
        // border-color: white;
        border-width: 3px;
        border-radius: 15px;
        padding: var(--padding);
        width: var(--width);
        z-index: 6;
        background: #1e1e1eac;

        &:hover {
          display:none !important;
        }
      }

      .display:hover::before {
        display: inline-block;
      }

      height: 100%;
      width: 100%;
      // max-height: ;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 10px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: none;
        border: 2px solid #ffffff7e;
        margin: 10px;
        border-radius: 10px;
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: #ffffff;
        border-radius: 10px;
      }

      &/* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    }

    #options {
      display: grid;
      grid-template: 1fr auto 1fr / 1fr auto auto 1fr;
      column-gap: 15px;
      outline-style:none;

      @media (max-width: 715px) {
        & {
          grid-template: 1fr auto 1fr / 1fr auto auto auto 1fr;           
        }
      }

      button {
        &#save {
          grid-area: 2/2;
        }

        &#reset {
          grid-area: 2/3;
        }

        &#home {
          display: none;
            @media (max-width: 715px) {
              & {
                display: block;
                grid-area: 2/4;
              }            
            }
        }
        width: 100px;
        height: 50px;    
        border-radius: 25px;
        border: none;    
        transition: .25s ease-in-out;
        &:active {
          background-color: var(--bg);
        }
      }
    }
  }
}
</style>