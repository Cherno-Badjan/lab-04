const { Router} = require('express');
const OrderService = require('../services/OrderService')
const Order = require('../model/Order')


//All routes
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
   const orders = await Order.select();


   res.send(orders)
    
})
.get('/:id', async (req,res,next) => {
   const order = await Order.selectById(req.params.id);


   res.send(order)
    
})

.put('/:id', async (req,res,next) => {
    const id = req.params.id;
    try {
        const order = await OrderService.updateById(id, req.body);
        res.send(order);
    }  catch(err) {
        next(err);
    }

})
.delete('/:id', async (req,res,next) => {
    const id = req.params.id;
    try {
        const order = await OrderService.deleteById(id, req.body);
        res.send(order);
    }  catch(err) {
        next(err);
    }

})