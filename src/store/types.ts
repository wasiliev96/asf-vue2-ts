export type SearchIDResponse = {
    searchId: string
}

export interface Ticket {
    // Цена в рублях
    price: number
    // Код авиакомпании (iata)
    carrier: string
    // Массив перелётов.
    // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
    segments: [
        {
            // Код города (iata)
            origin: string
            // Код города (iata)
            destination: string
            // Дата и время вылета туда
            date: string
            // Массив кодов (iata) городов с пересадками
            stops: string[]
            // Общее время перелёта в минутах
            duration: number
        },
        {
            // Код города (iata)
            origin: string
            // Код города (iata)
            destination: string
            // Дата и время вылета обратно
            date: string
            // Массив кодов (iata) городов с пересадками
            stops: string[]
            // Общее время перелёта в минутах
            duration: number
        }
    ]
}


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


export enum ACTION_TYPES {
    LOAD_TICKETS = 'LOAD_TICKETS',
    LOAD_SEARCH_ID = 'LOAD_SEARCH_ID'
}

export enum GETTER_TYPES {
    SELECTED_FILTERS = 'SELECTED_FILTERS',
    FILTERED_TICKETS = 'FILTERED_TICKETS',
}

export enum MUTATION_TYPES {
    SET_FILTERS = 'SET_FILTERS',
    SET_TICKETS = 'SET_TICKETS',
    SET_SEARCH_ID = 'SET_SEARCH_ID',
    SET_LOAD_STATUS = 'SET_LOAD_STATUS',
}
