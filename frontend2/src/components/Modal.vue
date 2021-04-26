<template>
    <div v-if="show" id="modal">
        <div id="shadow" @click="cancel"></div>
        <div id="box">
            <h1>{{title}}</h1>
            <div id="body">
                <div class="fields" v-for="(field, i) in innerFields" :key="i">
                    <span class="name" :style="`display: inline; --color: ${color}`">{{field.name}}:
                        <div class="tooltip">{{field.tooltip}}</div>
                    </span>
                    <!-- this is hwere the user will interact -->
                    <!-- <input type="text" name="potaot" placeholder="test" v-model="field.value" id=""> -->
                    <input v-if="field.info.type == 'string'" v-model="field.value" type="text" :placeholder="field.info.placeholder ?? ''" :name="`${field.name}-${i}`" class="text_input">
                    <input v-else-if="field.info.type == 'number'" type="number" v-model="field.value" :min="field.info.min ?? 0" :max="field.info.max ?? Number.MAX_SAFE_INTEGER" :name="`${field.name}-${i}`" class="number_input">
                    <input v-else-if="field.info.type == 'boolean'" type="checkbox" v-model="field.value" :name="`${field.name}-${i}`" class="check_input">
                    <input v-else-if="field.info.type == 'color'" type="color" v-model="field.value" :name="`${field.name}-${i}`" class="color_input">
                    <input v-else-if="field.info.type == 'time'" type="time" v-model="field.value" :min="field.info.min ?? '00:00'" :max="field.info.max ?? '23:59'" :name="`${field.name}-${i}`" class="time_input">
                    <img v-if="backgroundColor" src="../assets/delete_outline-white-18dp.svg" class="delete" style="filter: invert(85%) sepia(98%) saturate(7500%) hue-rotate(360deg) brightness(105%) contrast(108%);" :index="i" @click="del">
                </div>
            </div>
            <div id="actions">
                <button id="cancel" @click="cancel">Cancel</button>
                <button id="restart" @click="restart" v-if="backgroundColor">Restart</button>
                <button id="submit" @click="submit">Submit</button>
                <button id="create" @click="create" v-if="backgroundColor">Add Color</button>
            </div>
            <div id="preview" v-if="backgroundColor" :style="backgroundColorPreview"></div>
        </div>
    </div> 
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { easeInOutQuad } from '../store/store'
import { STORE } from '../utils/storeType'
import {arrify, OneOrMore} from '../utils/util'
// finisht types, do schedule, add notifications
export interface Field {
    name: string, 
    tooltip: string, 
    info: {
        type: "string" | "number" | "boolean" | "color" | "time",
        default?: string | number | boolean,
        placeholder?: string, // if string
        min?: number, // if bool
        max?: number // if bool
    },
    value?: unknown
}

@Options({
    props: {
        show: Boolean,
        title: String,
        fields: Object,
        color: String,
        backgroundColor: Boolean
    },
    emits: ["close"]
})

export default class Modal extends Vue {
    $store!: STORE 
    title!: string
    show!: boolean
    fields?: OneOrMore<Field>
    innerFields: Field[] = []
    backgroundColor?: boolean 
    bCUpdate = false 

    public mounted() { // this wont work since it gets mounted intially, i need to make it be fluid, but thats how the backgorund color things is. rework needed
        if(this.fields)
            this.innerFields = (arrify(this.fields) as Field[]).map(f => ({...f, ...{value: f.info.default != null && f.info.default != undefined ? f.info.default : null }}))
    }

    public updated() {
        if(this.backgroundColor && this.bCUpdate == false) {
            this.innerFields = this.$store.state.backgroundColors.map((c, i) =>{console.log(c, i) ;return ({name: 'Color #' + i, tooltip: `Edit color #${i} in the gradient`, value: c, info: {type: "color", default: c, placeholder: "#000000"}}) as Field})
            this.bCUpdate = true
        }
        if(!this.backgroundColor && this.bCUpdate)
            this.bCUpdate = false
    }

    get backgroundColorPreview() { // this.$store.state.backgroundColors
        return `background-image: linear-gradient(${this.$store.state.backgroundAngle}deg, ${this.innerFields.map(f => f.value).map((c, i , a) => `${c} ${easeInOutQuad(i / (a.length - 1))*100}%`).join(", ")})`
    }

    cancel() {
        // this.innerFields = []
        // this.bCUpdate = false
        this.$emit("close")
    }

    submit() {
        // this.innerFields = []
        // this.bCUpdate = false
        this.$emit("close", this.innerFields || this.fields)
    }

    create() {
        const i = this.innerFields.length
        this.innerFields = [...this.innerFields, {name: 'Color #' + i, tooltip: `Edit color #${i} in the gradient`, value: "#000000", info: {type: "color", default: "#000000", placeholder: "#000000"}}]
    }

    del(e) {
        const i = e.target.getAttribute("index")
        this.innerFields = this.innerFields.filter((f, _i) => _i != i)
    }
}

</script>
<style lang="scss" scoped>
input[type="color"] {
    background: none;
    border: none;
    width: 50px;
}

#modal {
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;

    display: grid;
    grid-template: 1fr auto 1fr / 1fr auto 1fr;

    #shadow {
        width: 100vw;
        height: 100vh;
        position: absolute;
        // background: #333;
        // opacity: .75;
        z-index: 4;
        backdrop-filter: blur(5px) brightness(.7); 
            //blur(3px);
    }

    #box {
        z-index: 5;
        grid-area: 2 / 2;
        --padding: 75px;
        --height: Min(550px, calc(100vh - var(--padding)));
        width: Min(800px, calc(100vw - var(--padding)));
        height: var(--height);
        border-radius: 35px;
        padding: calc(var(--padding) / 2);
        background: #111;
        opacity: .9;
        
        display: grid;
        grid-template: auto 1fr auto / 1fr 3fr 1fr;

        h1 {
            grid-area: 1 / 2;
        }

        #body {
            grid-area: 2 / 2;
            height: 100%;
            width: 100%;
            overflow-y: visible; 

            .fields {
                padding: 5px;
                .name {
                    --color: #fff;
                    font-size: 1.5em;
                    position: relative;
                    .tooltip {
                        display: none;
                    }
                    &:hover {
                        // color: var(--color);
                        .tooltip {
                            font-size: 1rem;
                            display: initial;
                            width: 150px;
                            position: absolute;
                            right: 120px;
                            border-radius: 15px;
                            border-color: var(--color);
                            border-style: solid;
                            padding: 5px;
                            border-width: 2px;
                            color: white;
                        }
                    }
                }
            }
        }

        #actions {
            grid-area: 3 / 2;
            padding: 30px;
            display: grid;
            grid-template: auto / 1fr auto auto 1fr;
            column-gap: 15px;
            row-gap: 10px;
            outline-style:none;

            button {
                &#cancel {
                    --bg: red;
                    grid-area: 2 / 2;
                }

                &#submit {
                    --bg: black;
                    grid-area: 2 / 3;
                }

                &#create {
                    --bg: var(--bg);
                    grid-area: 1 / 2;
                }

                &#restart {
                    --bg: var(--bg);
                    grid-area: 1 / 3;
                }

                width: 100px;
                height: 50px;    
                transform: scale(.9);
                border-radius: 25px;
                border: none;    
                transition: .25s ease-in-out;
                &:active {
                    background-color: var(--bg);
                }
            }
        }

        #preview {
            border-radius: 10px;
            margin: 2px;
        }
    }
}
</style>