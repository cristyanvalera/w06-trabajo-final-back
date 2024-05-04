const catchError = require('../utils/catchError');
const Category = require('../models/Category');
const Product = require('../models/Product');

const index = catchError(async (request, response) => {
    const results = await Category.findAll({ include: Product });

    return response.json(results);
});

const create = catchError(async (request, response) => {
    const result = await Category.create(request.body);

    return response.status(201).json(result);
});

const destroy = catchError(async (request, response) => {
    const { id } = request.params;

    const result = await Category.destroy({ where: { id } });

    if (!result) return response.sendStatus(404);

    return response.sendStatus(204);
});

module.exports = { index, create, destroy };