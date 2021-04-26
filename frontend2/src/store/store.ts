import { arrify, OneOrMore } from '@/utils/util'
import { SchedualSettings } from 'chronos-time'
import sched from './example_data.json'
function getContrastYIQ(hexcolor: string){
    const r = parseInt(hexcolor.substr(0,2),16);
    const g = parseInt(hexcolor.substr(2,2),16);
    const b = parseInt(hexcolor.substr(4,2),16);
    const yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
}



function avg(c: string,d: string){
    const regex = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/ //regular expression to parse string
    const a = regex.exec(c)!.slice(1)  //create array from string 'a' using regex
    const b = regex.exec(d)!.slice(1)  //create array from string 'b' using regex
    let output=''
    for(let i=0;i<3;i++){
        const value=Math.floor(
            (
            parseInt(a[i],16) + //parse decimal from hexadecimal
            parseInt(b[i],16)   //parse decimal from hexadecimal
            )/2                   //perform averaging
        ).toString(16)          //convert back to hexadecimal
        output += (value.length<2?'0':'') + value //add leading zero if needed
    }
    return output
}

export function easeInOutQuad(x: number): number {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

export interface ScheduleM {
    name: string, 
    scheduals: SchedualSettings[]
}

export const State = {
    backgroundColors: // #667eea → #764ba2
        // ["#36ebeb", "#280652"], 
        // ["#93a5cf", "#e4efe9"],
        // ["#667eea", "#764ba2"],
        ["#0CBABA", "#380036"],
// 
//         ["#7f5a83", "#0d324d"], // this is hte background colors
    backgroundAngle: 135,
    isBackgroundAnimated: true, 
    isBackgroundSmoothed: true, 
    contrastColorOverride: null, // this is the text color
    time: true,
    current: true,
    next: true, 
    settingsColorPercent: 50,
    hhsSchedule: true,
    hhsScheduleNames: ["","","","","","","",""] as string[],
    hhsScheduleLinks: ["","","","","","","",""] as string[],
    notifications: false, 
    timeBeforeNotification: 1.0,
    schedules: [] as ScheduleM[],
    usingSchedule: 0
}

export const state = {...State}
export const stateSettingsBlacklist: (keyof typeof state)[] = ["hhsScheduleNames", "hhsScheduleLinks", "notifications", "timeBeforeNotification", "schedules", "usingSchedule", "contrastColorOverride", "isBackgroundSmoothed"]
// export const stateSettingsWhilelist: (keyof typeof state)[] = (Object.keys(State) as (keyof typeof state)[]).filter(s => !stateSettingsBlacklist.includes(s))

export const StateInfo = {
    'backgroundColors': {
        display: 'Background Colors',
        tooltip: 'The list of colors you want for your background as a gradient'
    }, 
    'backgroundAngle': {
        display: 'Background Angle',
        tooltip: 'The angle you want your background to go'
    },
    isBackgroundAnimated: {
        display: 'Background Movement',
        tooltip: 'Do you want your background to be animated and move?'
    },
    time: {
        display: 'Current Time / Date',
        tooltip: 'Do you want to see the current time and date?'
    },
    current: {
        display: 'Current Period Info',
        tooltip: 'Do you want to see information about the current period?'
    }, 
    next: {
        display: 'Next Period Info',
        tooltip: 'Do you want to see details about the next time period?'
    },
    settingsColorPercent: {
        display: 'Primary Color',
        tooltip: 'The primary color based on background colors and percentage. Ex: if your background is blue and red, 50 would be purple.'
    },
    hhsSchedule: {
        display: 'Use HHS Schedule',
        tooltip: 'Do you want to use the HHS Schedule, or a custom one?'
    }
} as {
    [Key in keyof typeof state]: {
        display: string,
        tooltip: string
    }
}

// let a: Exclude<keyof typeof State, > = ''

export const mutations = {
    updateBackgroundColors: (s: typeof state, colors: string | string[]) => s.backgroundColors = arrify(colors),
    /* tslint:disable */
    updateState: (s: typeof state, thing: [keyof typeof state, string | string[] | number | boolean]) => {
        if(typeof thing[1] == typeof s[thing[0]])
            (s[thing[0]] as string | string[] | number | boolean)= thing[1]
    },
    updateEntireState: (s: typeof state, thing: typeof state) => {
        for(const name in thing)
            if(name in s)
                s[name] = thing[name]
    }, //(s = {...JSON.parse(JSON.stringify(s)), ...thing}),
    reset: (s: typeof state) => {
        console.log(State)
        for(const name in State)
            if(name in s)
                s[name] = State[name]
    },
    test: (s: typeof state) => console.log({...s})
    /* tslint:enable */
}

export const getters = {
    mainBackground: (s: typeof state) => `
        ${s.isBackgroundAnimated ? '' : `animation: AnimateBackground 15s cubic-bezier(0.075, 0.82, 0.165, 1) infinite;`}
        background-color: ${state.backgroundColors[0]};
        background-image: linear-gradient(${s.backgroundAngle}deg, ${s.backgroundColors.map((c, i , a) => `${c} ${easeInOutQuad(i / (a.length - 1))*100}%`).join(", ")});
    `,
    smoothingBackground: (s: typeof state) => `
        ${s.isBackgroundAnimated ? '' : `animation: AnimateBackground 15s cubic-bezier(0.075, 0.82, 0.165, 1) infinite;`}
        ${s.isBackgroundSmoothed ? `background-image: url(data:image/png;base64,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);` : ``}
    `,
    contrastColor: (s: typeof state) => s.contrastColorOverride != null && s.contrastColorOverride != undefined ? s.contrastColorOverride :  getContrastYIQ(s.backgroundColors.reduce(avg)),
    storeSettings: () => Object.keys(state).filter(s => !(stateSettingsBlacklist).includes(s as keyof typeof state)),
    interpolateColor: (s: typeof state) => {
        return ((colorA: string, colorB: string, amount = (s.settingsColorPercent as number % 100 / 100)) => {
            const [rA, gA, bA] = colorA.match(/\w\w/g)!.map((c) => parseInt(c, 16));
            const [rB, gB, bB] = colorB.match(/\w\w/g)!.map((c) => parseInt(c, 16));
            const r = Math.round(rA + (rB - rA) * amount).toString(16).padStart(2, '0');
            const g = Math.round(gA + (gB - gA) * amount).toString(16).padStart(2, '0');
            const b = Math.round(bA + (bB - bA) * amount).toString(16).padStart(2, '0');
            return '#' + r + g + b;
        })(s.backgroundColors[0], s.backgroundColors[s.backgroundColors.length - 1])
    }
}
//  Object.keys($store.state).filter(s => !['hhsScheduleNames', 'hhsScheduleLinks', 'notifications', 'timeBeforeNotification', 'schedules'].includes(s))
export const actions = {

}
