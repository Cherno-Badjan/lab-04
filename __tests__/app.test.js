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

  it('gets one order by id', async () => {
    const res = await request(app)
    .get(`/api/v1/orders/${order.id}`)

    expect(res.body).toEqual(order);
  })
  it('updates one order by id & sends an email', () => {
    return request(app)
      .put(`/api/v1/orders/${order.id}`)
      .send({ quantity: 40 })
      .then(() => {
        expect(amazonSes.sendEmail).toHaveBeenCalledTimes(1);
      });
  })
  it('deletes one order by id & sends an email', () => {
    return request(app)
      .delete(`/api/v1/orders/${order.id}`)
      .then(() => {
        expect(amazonSes.sendEmail).toHaveBeenCalledTimes(1);
      });
  })
})

