const Order = require('../model/Order');
const { sendEmail } = require('../utils/amazon-ses');

module.exports = class OrderService {
  static async create({ quantity }) {
    await sendEmail(
      process.env.AWS_EMAIL, 'Cherno',
      `New Order received for ${quantity}`
    );

    const order = await Order.insert({ quantity });

    return order;
  }
}