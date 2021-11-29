import axios, {AxiosPromise} from 'axios';
import {SearchIDResponse, Ticket} from "@/services/types";

const BASE_URL = 'https://front-test.beta.aviasales.ru';

const aviaSalesAPIClient = axios.create({
    baseURL: BASE_URL,
    timeout: 2000,
});

const getSearchId = (): AxiosPromise<SearchIDResponse> => {
    return aviaSalesAPIClient.get('/search');
}

const getTickets = (searchId: string): AxiosPromise<{ tickets: Ticket[], stop: boolean }> => {
    const params = {searchId}
    return aviaSalesAPIClient.get('/tickets', {params})
}


export {
    aviaSalesAPIClient,
    getSearchId,
    getTickets
}
