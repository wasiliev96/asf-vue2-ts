import {ACTION_TYPES, LOAD_STATUS, MUTATION_TYPES, StateType} from "@/store/types";
import {getSearchId, getTickets} from "@/services/AviaSalesService";

type LoadTicketsPayloadType = {
    commit: (mutationName: string, payload: any) => void,
    state: StateType,
    dispatch: (payload?: any) => void
}
export default {

    [ACTION_TYPES.LOAD_SEARCH_ID]: async (
        {
            commit
        }: { state: StateType, commit: (mutationName: string, payload: any) => void }): Promise<void> => {
        const searchId = await getSearchId()
            .then(res => res.data.searchId);
        if (!searchId.length) {
            commit(MUTATION_TYPES.SET_LOAD_STATUS, {status: LOAD_STATUS.REJECT});
        }
        commit(MUTATION_TYPES.SET_SEARCH_ID, {searchId})
    },


    [ACTION_TYPES.LOAD_TICKETS]: async ({commit, state, dispatch}: LoadTicketsPayloadType): Promise<void> => {
        console.log('loading tickets...');
        try {
            commit(MUTATION_TYPES.SET_LOAD_STATUS, {status: LOAD_STATUS.PENDING});

            if (!state.searchId) {
                await dispatch(ACTION_TYPES.LOAD_SEARCH_ID)
            }

            const {tickets} = await getTickets(state.searchId)
                .then(res => res.data);
            if (tickets) {
                commit(MUTATION_TYPES.SET_TICKETS, {tickets})
                commit(MUTATION_TYPES.SET_LOAD_STATUS, {status: LOAD_STATUS.RESOLVE});
            } else {
                commit(MUTATION_TYPES.SET_LOAD_STATUS, {status: LOAD_STATUS.REJECT});
            }
        } catch
            (error) {
            console.error(error)
            commit(MUTATION_TYPES.SET_LOAD_STATUS, {status: LOAD_STATUS.REJECT, response: error});
        }
    }
}
