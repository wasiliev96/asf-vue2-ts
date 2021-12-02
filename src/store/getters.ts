import {GETTER_TYPES, SORT_TYPE, SortType, StateType, Ticket} from "@/store/types";
import {compareAsc, parseISO} from 'date-fns';

const sortedTickets = (tickets: Ticket[], sortBy: SortType): Ticket[] => {
    const ticketOverallTime = (ticket: Ticket) => {
        return ticket.segments.reduce((time, segment) => time + segment.duration, 0);
    }
    const compare = (ticket1: Ticket, ticket2: Ticket) => {
        switch (sortBy) {

            case SORT_TYPE.cheap:
                return ticket1.price - ticket2.price;

            case SORT_TYPE.speed:
                return ticketOverallTime(ticket1) - ticketOverallTime(ticket2);

            //earliest
            case SORT_TYPE.optimal:
                return compareAsc(parseISO(ticket1.segments[0].date), parseISO(ticket2.segments[0].date));

            default:
                return -1;
        }
    }
    return tickets.sort(compare);
}

export default {
    // [GETTER_TYPES.SELECTED_FILTERS]: (state: StateType): FilterType[] | undefined => {
    //     return state.filters?.filter((filter: FilterType) => filter.active)
    // },

    [GETTER_TYPES.FILTERED_TICKETS]: (state: StateType) => (stopsArray: number[], sortBy: SortType): Ticket[] | undefined => {
        let filteredTickets;
        if (stopsArray.length > 0) {
            filteredTickets = state.tickets
                .filter(
                    ticket => ticket.segments.every((segment) => stopsArray.includes(segment.stops.length))
                );
            return sortedTickets(filteredTickets, sortBy);
        } else {
            filteredTickets = state.tickets;
            return sortedTickets(filteredTickets, sortBy);
        }
    }
}
