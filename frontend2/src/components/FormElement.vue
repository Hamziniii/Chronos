<template>
    <!-- <p>{{type}} {{name}}</p> -->
    <button v-if="type == 'Boolean'" @click="local = !local ?? !this.$store.state[this.name]" :class="(local ?? this.$store.state[this.name]) ? 'enabled' : 'disabled'">{{local ?? this.$store.state[this.name]}}</button>
    <input v-else-if="type == 'Number'" type="number" :value="this.$store.state[this.name]" min="0" max="359">
    <input v-else-if="type == 'Array'" type="text" :value="this.$store.state[this.name].join(', ')">
    <span v-else>{{this.$store.state[this.name] ?? "n/a"}}</span>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import store from '../store/index'
import {STORE} from '../utils/storeType'

@Options({
  props: {
    name: String
  }
})
export default class FormElements extends Vue {
  name!: string
  $store!: STORE
  local: STORE["state"][keyof STORE["state"]] = null  
  // type!: "String Array" | "String" | "Number" | "Boolean" | "DNE"
  
  public mounted() {
    this.local = this.$store.state[this.name]
  }

  get type() {
    if(Object.keys(this.$store.state).includes(this.name)) {
      const key = this.name as keyof STORE["state"]
      const s = this.$store.state[key]
      // console.log(typeof s)
      if(!(typeof s == 'number') && (s == true || s == false))
        return "Boolean"
      else if(s != null && !isNaN(s as number))
        return "Number"
      else if(Array.isArray(s))
        return "Array"
      else
        return "N/A"
    } else 
      return "DNE"
  }

}
</script>

<style lang="scss" scoped>
button {
  color: white;
  background: none;
  border-style: none;
  border-bottom: 2px solid;
  padding: 1px 3px;
}

.enabled {
  border-color: #0dff00e1;
}
.disabled {
  border-color: #ff00009e;
}
input {
  &[type=number] {
    width: 40px;
  }
  &[type=text] {
    width: 100px;
  }

  text-align: center;
}

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button {  
   opacity: 1;
}

span {
  display: inline;
}
</style>