export const arrify = <T>(t: T[] | T): T[] => Array.isArray(t) ? t : [t]
export type OneOrMore<T> = T | T[]