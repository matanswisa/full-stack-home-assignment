import axios, { AxiosResponse } from 'axios';
import { APICloneTicket, APIPath, APIRootPath, CloneTicketRequest } from '@fed-exam/config';

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
    getTicketsByPageNumber: (page: number) => Promise<Ticket[]>;
}

export const createApiClient = (): ApiClient => {
    return {
        getTickets: () => {
            return axios.get(APIRootPath).then((res) => res.data);
        },
        cloneTicket: (ticket: Ticket) => {
            return axios.post(CloneTicketRequest, { ...ticket }).then((res) => res.data);
        },
        getTicketsByPageNumber: (pageNumber: number) => {
            return axios.get(`${APIRootPath}/by?page=${pageNumber}`).then((res) => res.data)
        }
    }
}
