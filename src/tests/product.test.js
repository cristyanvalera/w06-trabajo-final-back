require('../models');

const request = require('supertest');
const app = require('../app');
const Category = require('../models/Category');

const URL_BASE = '/api/v1/products';
let TOKEN;
let productId;

const product = {
    title: 'Amp',
    description: 'AMP Marshall',
    price: 12.56,
};

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

test('GET "/products" should return status code 200 and body can be defined', async () => {
    const response = await request(app)
        .get(URL_BASE);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
});

test('POST "/products" should return status code 201 and create a new product', async () => {
    const createCategory = await Category.create({ name: 'Category 01' });

    const response = await request(app)
        .post(URL_BASE)
        .send({ ...product, categoryId: createCategory.id })
        .set('Authorization', `Bearer ${TOKEN}`);

    productId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.categoryId).toBeDefined();
    expect(response.body.categoryId).toBe(createCategory.id);
});

test('GET "/products/:id" should return status code 200', async () => {
    const response = await request(app)
        .get(`${URL_BASE}/${productId}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.title).toBe(product.title);
});

test('PUT "/products/:id" should return status code 200', async () => {
    const data = {
        title: 'Amplificador',
        description: 'AMP Marshall',
        price: 121.56,
    };

    const response = await request(app)
        .put(`${URL_BASE}/${productId}`)
        .send(data)
        .set('Authorization', `Bearer ${TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(data.title);
    expect(response.body.price).toBe(data.price * 100);
});

test('DELETE "/products/:id" should return status code 204', async () => {
    const response = await request(app)
        .delete(`${URL_BASE}/${productId}`)
        .set('Authorization', `Bearer ${TOKEN}`);

    expect(response.status).toBe(204);
});
