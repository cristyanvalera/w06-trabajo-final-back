require('../models');

const request = require('supertest');
const app = require('../app');

const URL_BASE = '/api/v1/cart';

let TOKEN;

beforeAll(async () => {
    const user = {
        email: 'josuan.rodriguez@mail.com',
        password: 'josuan1234',
    };

    const response = await request(app)
        .post('/api/v1/users/login')
        .send(user);

    TOKEN = response.body.token;
});

test('GET "/cart" should return status code 200', async () => {
    const response = await request(app)
        .get(URL_BASE)
        .set('Authorization', `Bearer ${TOKEN}`);
    
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
});