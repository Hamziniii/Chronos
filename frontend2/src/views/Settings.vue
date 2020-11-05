
<template>
  <div class="settings">
    <h1>This the settings page, current settings:</h1>
    <h2>{{$store.state}}</h2>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({name: "Settings"})
export default class Settings extends Vue {


}
</script>

<style lang="scss" scoped>

</style>