<template>
    <svg id="Clock" data-name="Clock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" :style="`width: ${s}; height: ${s};`">
        <circle id="Background" cx="250" cy="250" r="250" :style="`fill:${darkMode ? '#000' : '#fff'}`"/>
        <g id="HourHand"><line id="HGone" x1="250" y1="252.12" x2="250" y2="460" style="fill:blue;stroke-miterlimit:10;stroke-width:20px;stroke-linecap:butt;"/><line id="HShow" x1="250" y1="70" x2="250" y2="247.88" transform="rotate(70,250,250)" :style="`stroke:${!darkMode ? '#000' : '#fff'};fill:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:20px`"><animateTransform attributeName="transform" attributeType="XML" type="rotate" from="70 250 250" to="430 250 250" dur="2s" repeatCount="indefinite"/></line></g>
        <g id="MinuteHand"><line id="MGone" x1="250" y1="251.07" x2="250" y2="356.07" style="fill:blue;stroke-miterlimit:10;stroke-width:20pxstroke-linecap:butt;"/><line id="MShow" x1="250" y1="143.93" x2="250" y2="248.93" transform="rotate(130,250,250)" :style="`stroke:${!darkMode ? '#000' : '#fff'};fill:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:20px`"><animateTransform attributeName="transform" attributeType="XML" type="rotate" from="130 250 250" to="490 250 250" dur="7s" repeatCount="indefinite"/></line></g>
    </svg>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import store from '../store/index'
import {STORE} from '../utils/storeType'

@Options({props: {r1: Number, r2: Number, s: String, darkMode: Boolean}})
export default class Clock extends Vue {
    s!: string // SIZE
    darkMode!: boolean
}
</script>