import axios from 'axios';

const BASE_URL = 'https://front-test.beta.aviasales.ru/';

const aviaSalesAPIClient = axios.create({
    baseURL: BASE_URL,
    timeout: 2000,
});

export {
    aviaSalesAPIClient,
}
