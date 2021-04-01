const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/model/Order')

jest.mock('../lib/utils/amazon-ses.js');
const amazonSes = require('../lib/utils/amazon-ses');


describe('lab-4 routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

let order;
beforeEach(async() => {
  order = await Order.insert({quantity:10});

  amazonSes.sendEmail.mockClear();

});


  it('creates a new order in our database and sends an email', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then(() => {
        expect(amazonSes.sendEmail).toHaveBeenCalledTimes(1);
      });
  });
  it('gets all orders', async () => {
    const res = await request(app)
    .get('/api/v1/orders')
    expect(res.body).toEqual([order]);
  })
})
