<template>
  <div class="scheduling">
    <div v-if="view == views[0]" id="SMM">
      <h1 id="title" style="margin-bottom: 5px;">{{title}}</h1>
      <span><br>the schedule wont change, but you can still mess around with this ig.</span>
      <span v-if="$store.state.schedules.length == 0 || $store.state.schedules == null || $store.state.schedules == ({})" style="display:block">No custom schedules added yet! Click plus button to add one.</span>
      <div id="schedules" v-for="(s, i) in $store.state.schedules" :key="i" :index="i">
        <div class="schedule">Name: <input type="text" name="schedule" v-model="$store.state.schedules[i].name"></div>
        <div class="using">Use: <input type="checkbox" name="using" :checked="$store.state.usingSchedule == i" @click="updateUsingSchedule"></div>
        <img src="../assets/edit-white-18dp.svg" class="edit" @click="switchToSM">
        <img src="../assets/delete_outline-white-18dp.svg" class="delete" @click="deleteSchedule">
      </div>
      <!-- <div>{{$store.state.schedules}}<br>{{$store.state.usingSchedule}}</div> -->
      <img src="../assets/add_circle-white-18dp.svg" id="add" @click="addSchedule">
    </div>
    <div v-else-if="view == views[1]" id="SM">
      <h1 id="title">{{title}}</h1>
      <div class="day" v-for="(d, i) in $store.state.schedules[index].scheduals" :index="i" :key="i">
        <span class="text">{{(str => str.charAt(0).toUpperCase() + str.slice(1))(d.tags[0])}}</span>
        <img src="../assets/edit-white-18dp.svg" class="edit" @click="switchToS">
      </div>
      <img src="../assets/arrow_back-white-18dp.svg" id="back" @click="switchToSMM">
    </div>
    <div id="S" v-else-if="view == views[2]">
      <h1 id="title">{{title}}</h1>
      <div class="time" v-for="(t, i) in $store.state.schedules[index].scheduals[subIndex].timeSlots" :index="i" :key="i">
        <div class="name"><div id="name_text">Name: <input type="text" name="timename" id="input_time" v-model="t.name"></div> <img src="../assets/delete_outline-white-18dp.svg" class="delete" @click="deleteSchedule"></div>
        <div class="begin">Begin: <input type="time" name="begin" id="input_begin" @change="updateTimeBegin" :value="`${t.begin[0] < 10 ? '0' + t.begin[0] : t.begin[0]}:${t.begin[1] < 10 ? '0' + t.begin[1] : t.begin[1]}`"></div>
        <div class="end">End: <input type="time" name="end" id="input_end" @change="updateTimeEnd" :value="`${t.end[0] < 10 ? '0' + t.end[0] : t.end[0]}:${t.end[1] < 10 ? '0' + t.end[1] : t.end[1]}`"></div>
        <span v-if="(t.end[0] * 60 + t.end[1]) <= (t.begin[0] * 60 + t.begin[1])" style="color:red;font-size:1.2rem;">The end must chonologically come after the beginning!</span>
        <span v-if="i > 0 && ($store.state.schedules[index].scheduals[subIndex].timeSlots[i-1].end[0] * 60 + $store.state.schedules[index].scheduals[subIndex].timeSlots[i-1].end[1]) >= (t.begin[0] * 60 + t.begin[1])" style="color:red;font-size:1.2rem;">This timeslot must chonologically come after the previous one!</span>
      </div>
      <span v-if="($store.state.schedules[index].scheduals[subIndex].timeSlots.length ?? 0) == 0"><br>Schedule is empty. If you have something on this day, add a time slot!</span>
      <img src="../assets/arrow_back-white-18dp.svg" id="back" @click="switchToSM">
      <img src="../assets/add_circle-white-18dp.svg" id="add" @click="addTimeSlot">
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ScheduleM } from '../store/store';
import { STORE } from '../utils/storeType';
import { OneOrMore } from '../utils/util';

import { example_data } from '../store/example_empty_data'

@Options({
    name: "Scheduling",
    props: {
      color: String
    }
})
export default class Scheduling extends Vue {
  color!: string
  $store!: STORE
  views = ["SMM", "SM", "S"]
  view = this.views[0]
  index = -1
  subIndex = -1

  check = "3"

  get potato() {
    return this.check
  }

  set potato(val) {
    console.log(val)
    this.check = val
  }

  addSchedule() {
    if(Array.isArray(this.$store.state.schedules))
      this.$store.commit("updateState", ["schedules", [...this.$store.state.schedules, {name: "edit the name here", scheduals: example_data}]])
    else if(this.$store.state.schedules == null || this.$store.state.schedules == undefined)
      this.$store.commit("updateState", ["schedules", [{name: "undefined", scheduals: []}]])
    else 
      console.log("something is wrong")
  }

  updateUsingSchedule(e) {
    this.$store.commit('updateState', ['usingSchedule', parseInt(e.target.parentElement.parentElement.getAttribute("index"))])
    // console.log(this.$store.state.usingSchedule, parseInt(e.target.parentElement.parentElement.getAttribute("index")))
  }

  deleteSchedule(e) {
    const schedules = this.$store.state.schedules.filter((v, i) => i != e.target.parentElement.getAttribute("index"))
    if(confirm(`Are you sure you want to delete ${e.target.parentElement.children[0].children[0].value}`))
      this.$store.commit('updateState', ['schedules', schedules])
  }

  addTimeSlot() {
    const temp = this.$store.state.schedules
    temp[this.index].scheduals[this.subIndex].timeSlots = [...temp[this.index].scheduals[this.subIndex].timeSlots, {name: 'Time Slot', begin: [7, 30], end: [12, 0]}] 
    this.$store.commit('updateState', ['schedules', temp])
  }

  switchToSM(e) {
    if(this.subIndex == -1)
      this.index = parseInt(e.target.parentElement.getAttribute("index"))
    this.subIndex = -1
    this.view = "SM"
  }

  switchToS(e) {
    this.subIndex = parseInt(e.target.parentElement.getAttribute("index"))
    this.view = "S"
  }

  switchToSMM() {
    this.index = -1
    this.view = "SMM"
  }

  get title() {
    switch(this.view) {
      case "SMM":
        return "Schedule"
      case "SM":
        return "Days"
      case "S":
        return "Times"
    }
    return "N/A"
  }

  updateTimeBegin(e) {
    // console.log(this.$store.state.schedules[this.index].scheduals[this.subIndex].timeSlots[parseInt(e.target.parentElement.parentElement.getAttribute("index"))] = e.target.value.split(':').map(v => parseInt(v)))
    this.$store.state.schedules[this.index].scheduals[this.subIndex].timeSlots[parseInt(e.target.parentElement.parentElement.getAttribute("index"))].begin = e.target.value.split(':').map(v => parseInt(v))
  }
  updateTimeEnd(e) {
    // console.log(this.$store.state.schedules[this.index].scheduals[this.subIndex].timeSlots[parseInt(e.target.parentElement.parentElement.getAttribute("index"))] = e.target.value.split(':').map(v => parseInt(v)))
    this.$store.state.schedules[this.index].scheduals[this.subIndex].timeSlots[parseInt(e.target.parentElement.parentElement.getAttribute("index"))].end = e.target.value.split(':').map(v => parseInt(v))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.scheduling {
    width: 100%;
    height: 100%;
    position: relative;

    * > #title {
      display: inline-block;
      margin-top: 0px;
    }

    #SMM {
      height: 100%;
      width: 100%;

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

      #schedules {
        display: inline-block;
        padding: 10px 20px;
        margin: 0px auto;
        margin-bottom: 15px;

        // background: var(--color);
        border-color: white;
        border-width: 2px;
        border-style: solid;
        width: 65%;
        border-radius: 30px;

        display: grid;
        grid-auto-flow: column;
        grid-template: 1fr / auto auto auto auto;
        place-items: center;

        .edit, .delete {
          display: inline-block;
          transform: scale(1.3);
        }

        .delete {
          filter: invert(85%) sepia(98%) saturate(7500%) hue-rotate(360deg) brightness(105%) contrast(108%);
        }

        .using, .schedule {
          display: inline-block;
        }
        .schedule {
          padding: 10px 0px;
        }
      }

      #add {
        position: absolute;
        right: 20px;
        bottom: 10px;
        width: 35px;
        height: 35px;
        transition: transform .2s;

        &:hover {
          transform: scale(1.25);
        }
      }
    }

    #SM {
      width: 100%;
      height: 100%;
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

      #back {
        position: absolute;
        right: 20px;
        bottom: 10px;
        width: 35px;
        height: 35px;
        transition: transform .2s;

        &:hover {
          transform: scale(1.25);
        }
      }

      .day {
        display: grid;
        grid-auto-flow: column;
        grid-template: 1fr / 1fr auto;
        width: 50%;
        margin: 0px auto;
        margin-bottom: 10px;
        padding: 10px;
        border-style: solid;
        border-radius: 15px;

        .edit {
          transform: scale(1.3);
        }
      }
    }

    #S {
      width: 100%;
      height: 100%;
      overflow-y: auto;

      div > #name_text > input[type="time"] {
          border: none;
          border-radius: 10px;
          padding: 1px 5px;
      }

      .time {
        width: 50%;
        margin: 0px auto;
        display: grid;
        row-gap: 10px;
        padding: 10px 5px;
        border-style: solid;
        border-color: white;
        border-width: 3px;
        border-radius: 30px;
        margin-bottom: 10px;
        
        .name {
          display: grid;
          place-items: center;
          grid-auto-flow: column;

          #input_time, #name_text {
            grid-area: 1 / 1;
            display: inline-block;
          }

          .delete {
            filter: invert(85%) sepia(98%) saturate(7500%) hue-rotate(360deg) brightness(105%) contrast(108%);
            transform: scale(1.5);
          }
        }
      }

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

      #back {
        position: absolute;
        right: 60px;
        bottom: 10px;
        width: 35px;
        height: 35px;
        transition: transform .2s;

        &:hover {
          transform: scale(1.25);
        }
      }

      #add {
        position: absolute;
        right: 20px;
        bottom: 10px;
        width: 35px;
        height: 35px;
        transition: transform .2s;

        &:hover {
          transform: scale(1.25);
        }
      }
    }
}
</style>
