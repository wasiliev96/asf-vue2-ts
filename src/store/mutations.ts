import {LoadStatus, MUTATION_TYPES, StateType, Ticket} from "@/store/types";

type SetTicketsPayloadType = {
    tickets: Ticket[]
}
type SetLoadStatusType = {
    status: LoadStatus,
    response?: any
}
export default {
    [MUTATION_TYPES.SET_TICKETS]: (state: StateType, {tickets}: SetTicketsPayloadType): void => {
        state.tickets = tickets.map(ticket => ({...ticket, id: tickets.indexOf(ticket)}))
    },
    [MUTATION_TYPES.SET_SEARCH_ID]: (state: StateType, {searchId}: { searchId: string }): void => {
        state.searchId = searchId;
    },
    [MUTATION_TYPES.SET_LOAD_STATUS]: (state: StateType, {status, response}: SetLoadStatusType): void => {
        state.loading.status = status;
        state.loading.response = response;

    }
}
