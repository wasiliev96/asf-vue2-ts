import {StateType, LoadStatus} from "@/store/state";
import {FilterType, MUTATION_TYPES, Ticket} from "@/store/types";

type SetFiltersPayloadType = {
    filters: FilterType[];
}
type SetTicketsPayloadType = {
    tickets: Ticket[]
}
type SetLoadStatusType = {
    status: LoadStatus,
    response?: any
}
export default {
    [MUTATION_TYPES.SET_FILTERS]: (state: StateType, {filters}: SetFiltersPayloadType): void => {
        state.filters = filters
    },
    [MUTATION_TYPES.SET_TICKETS]: (state: StateType, {tickets}: SetTicketsPayloadType): void => {
        state.tickets = tickets
    },
    [MUTATION_TYPES.SET_SEARCH_ID]: (state: StateType, {searchId}: { searchId: string }): void => {
        state.searchId = searchId;
    },
    [MUTATION_TYPES.SET_LOAD_STATUS]: (state: StateType, {status, response}: SetLoadStatusType) => {
        state.loading.status = status;
        state.loading.response = response;

    }
}
