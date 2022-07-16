import axios, { AxiosResponse } from 'axios';
import { APICloneTicket, APIRootPath, CloneTicketRequest } from '@fed-exam/config';

export type Ticket = {
    id: string,
    title: string;
    content: string;
    creationTime: number;
    userEmail: string;
    labels?: string[];
    show?: boolean
}

export type ApiClient = {
    getTickets: () => Promise<Ticket[]>;
    cloneTicket: (ticket: Ticket) => Promise<AxiosResponse>;
}

export const createApiClient = (): ApiClient => {
    return {
        getTickets: () => {
            return axios.get(APIRootPath).then((res) => res.data);
        },
        cloneTicket: (ticket: Ticket) => {
            return axios.post(CloneTicketRequest, { ...ticket }).then((res) => res.data);
        }
    }
}
