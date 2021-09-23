const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/model/Order');

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates an order', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 20})
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          quantity: 20,
        });
      });
  });

  it('gets all orders', async () => {

    const orders = await Promise.all([
      Order.insert({ quantity: 40}),
      Order.insert({ quantity: 50 }),
      Order.insert({ quantity: 20}),
    ]);

    return request(app)
      .get('/api/v1/orders')
      .then((res) => {
        expect(res.body).toEqual(expect.arrayContaining(orders));
      });
  });
});