export enum SORT_TYPE {
    speed = 'speed',
    cheap = 'cheap',
    optimal = 'optimal'
}

export type SortType = SORT_TYPE.optimal | SORT_TYPE.cheap | SORT_TYPE.speed | null;

interface FilterType {
    title: string,
    value: number,
    active: boolean
}

// Radio select
export interface SelectType{
    title: string,
    value: string
}
