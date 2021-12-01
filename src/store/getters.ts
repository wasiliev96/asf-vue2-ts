import {FilterType, GETTER_TYPES, Ticket} from "@/store/types";
import {StateType} from "@/store/state";

type FilterTicketObj = {
    active:boolean,
    title:string,
    value: number
}
export default {
    [GETTER_TYPES.SELECTED_FILTERS]: (state: StateType): FilterType[] | undefined => {
        return state.filters?.filter((filter: FilterType) => filter.active)
    },

    [GETTER_TYPES.FILTERED_TICKETS]: (state: StateType) => (filterObjects: FilterTicketObj[]): Ticket[] | undefined => {
        console.log(`getting filtered tickets...`);
        return state.tickets?.filter((ticket) => {
            return true;

        })
    }
}
