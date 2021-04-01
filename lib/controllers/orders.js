const { Router} = require('express');
const OrderService = require('../services/OrderService')
const Order = require('../model/Order')



module.exports = Router()
.post('/', async (req,res,next) => {
    try {
        const order = await OrderService.create(req.body);
        res.send(order);
    } catch(err) {
        next(err);
    }
    
})
.get('/', async (req,res,next) => {
   const orders = await Order.select()

   res.send(orders)
    
})