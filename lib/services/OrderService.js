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

  static async updateById(id,{quantity}) {
    await sendEmail(
      process.env.AWS_EMAIL, `Order update: Quantity changed to ${quantity}`
    );

    const order = await Order.updateById({id,quantity});

    return order;
  }
  static async deleteById(id,{quantity}) {
    await sendEmail(
      process.env.AWS_EMAIL, `Order update: Order of quantity= ${quantity} has been deleted.`
    );

    const order = await Order.deleteById({id,quantity});

    return order;
  }
}