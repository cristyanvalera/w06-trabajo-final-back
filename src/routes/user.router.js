const express = require('express');
const { index, create, destroy, update, login } = require('../controllers/user.controller');

const routerUser = express.Router();

routerUser.route('/')
    .get(index)
    .post(create);

routerUser.route('/login')
    .post(login);

routerUser.route('/:id')
    .delete(destroy)
    .put(update);

module.exports = routerUser;