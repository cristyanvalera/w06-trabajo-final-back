const express = require('express');
const { index, create, show, destroy, update } = require('../controllers/cart.controller');

const routerCart = express.Router();

routerCart.route('/')
    .get(index)
    .post(create);

routerCart.route('/:id')
    .get(show)
    .delete(destroy)
    .put(update);

module.exports = routerCart;