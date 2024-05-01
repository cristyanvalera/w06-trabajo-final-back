const express = require('express');
const { index, create, destroy } = require('../controllers/category.controller');

const routerCategory = express.Router();

routerCategory.route('/')
    .get(index)
    .post(create);

routerCategory.route('/:id')
    .delete(destroy);

module.exports = routerCategory;