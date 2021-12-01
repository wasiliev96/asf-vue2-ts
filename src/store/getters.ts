import {FilterType, GETTER_TYPES, Ticket} from "@/store/types";
import {StateType} from "@/store/state";

export default {
    [GETTER_TYPES.SELECTED_FILTERS]: (state: StateType): FilterType[] | undefined => {
        return state.filters?.filter((filter: FilterType) => filter.active)
    },

    [GETTER_TYPES.FILTERED_TICKETS]: (state: StateType) => (stopsArray: number[]): Ticket[] | undefined => {
        console.log(`getting filtered tickets...`);
        return state.tickets
            .filter(
                ticket => ticket.segments.every((segment) => stopsArray.includes(segment.stops.length))
            );
    }
}
