import { arrify } from '@/utils/util'
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

export const state = {
    backgroundColors: ["#7f5a83", "#0d324d"], // this is hte background colors
    color: null, // this is the text color
}

export const mutations = {
    updateBackgroundColors: (s: typeof state, colors: string | string[]) => s.backgroundColors = arrify(colors)
}

export const getters = {
    CSSbackgroundColors: (s: typeof state) => `
        background-color: ${state.backgroundColors[0]};
        background-image: linear-gradient(45deg, ${s.backgroundColors.map((c, i , a) => `${c} ${i / a.length}%`).join(", ")});
    `,
    contrastColor: (s: typeof state) => s.color != null && s.color != undefined ? s.color :  getContrastYIQ(s.backgroundColors.reduce(avg))
}

export const actions = {

}
