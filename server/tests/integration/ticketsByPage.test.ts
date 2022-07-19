import request from 'supertest';
import Knex from 'knex';
import { app } from '../..';


describe('Get All Posts by a page number', () => {

    let api: request.SuperTest<request.Test>;

    beforeEach(async () => {
        api = request(app);

    })

    describe('GET /api/tickets/by?page=', () => {
        it("should respone with status code 200 if send valid page value", () => {
            return api.get('/api/tickets/by?page=0').expect(200)
        })
    })

    describe('GET /api/tickets/by?page=', () => {
        it("Should respone with error 400 if sent invalid page number", () => {
            const invalidPageNumber = -1;
            return api.get(`/api/tickets/by?page=${invalidPageNumber}`).expect(400)
        })
    })

    describe('GET /api/tickets/by?page=', () => {
        it("Should respone with status error 400 if sent page type different than number", () => {

            return api.get(`/api/tickets/by?page=${undefined}`).expect(400)
        })
    })

})

