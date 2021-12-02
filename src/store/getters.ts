import {GETTER_TYPES, StateType, Ticket} from "@/store/types";
import {compareAsc, parseISO} from 'date-fns';
import {SORT_TYPE, SortType} from "@/types";

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
