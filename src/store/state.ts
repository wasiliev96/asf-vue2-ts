import {Ticket, FilterType, SORT_TYPE, SortType} from "@/store/types";

export enum LOAD_STATUS {
    PENDING = 'PENDING',
    RESOLVE = 'RESOLVE',
    REJECT = 'REJECT',
}

export type LoadStatus = LOAD_STATUS.REJECT | LOAD_STATUS.RESOLVE | LOAD_STATUS.PENDING;

export interface StateType {
    tickets: Ticket[],
    filters: FilterType[],
    sortType: null | SortType,
    searchId: string,

    loading: {
        status: LoadStatus,
        response?: any
    }
}

const state: StateType = {
    tickets: [],
    filters: [],
    sortType: SORT_TYPE.optimal,
    searchId: '',
    loading: {
        status: LOAD_STATUS.PENDING,
        response: ''
    }
}
export default state;
