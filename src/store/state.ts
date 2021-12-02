import {StateType, LOAD_STATUS} from "@/store/types";


const state: StateType = {
    tickets: [],
    searchId: '',
    loading: {
        status: LOAD_STATUS.PENDING,
        response: ''
    }
}
export default state;
