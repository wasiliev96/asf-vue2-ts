export enum SORT_TYPE {
    speed = 'speed',
    cheap = 'cheap',
    optimal = 'optimal'
}

export type SortType = SORT_TYPE.optimal | SORT_TYPE.cheap | SORT_TYPE.speed | null;

export interface FilterType {
    title: string,
    value: number,
    active: boolean
}


export type SortButtons = { title: string, value: SortType }[]


// Radio select
export interface SelectType {
    title: string,
    value: string
}
