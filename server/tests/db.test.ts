import request from 'supertest';
import Knex from 'knex';
import { app } from '..';


// let api: request.SuperTest<request.Test> | null = null;

describe('Get All Posts by a page number', () => {

    console.log('lol');
    let api: request.SuperTest<request.Test>;

    beforeEach(async () => {
        api = request(app);
        const knex = Knex({
            client: 'sqlite3',
            connection: ":memory:",
        });
    })

    describe('GET /api/tickets/by?page=', () => {
        it("should respone with status code 200 if successful", () => {
            api.get('/api/tickets/by?page=0').expect(400);
        })
    })

})

