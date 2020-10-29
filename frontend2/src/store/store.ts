import { arrify } from '@/utils/util'

export const state = {
    backgroundColors: ["#7f5a83", "#0d324d"]
}

export const mutations = {
    updateBackgroundColors: (s: typeof state, colors: string | string[]) => s.backgroundColors = arrify(colors)
}

export const getters = {
    CSSbackgroundColors: (s: typeof state) => `
    background-color: ${state.backgroundColors[0]};
    background-image: linear-gradient(45deg, ${state.backgroundColors.map((c, i , a) => `${c} ${i / a.length}%`).join(", ")});
  `
}

export const actions = {

}