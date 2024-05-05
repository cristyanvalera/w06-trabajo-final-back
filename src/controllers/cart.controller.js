const catchError = require('../utils/catchError');
const Cart = require('../models/Cart');
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');

const index = catchError(async (request, response) => {
    const results = await Cart.findAll({
        include: [
            User,
            { model: Product, include: Category },
        ],
    });

    return response.json(results);
});

const create = catchError(async (request, response) => {
    const result = await Cart.create(request.body);

    return response.status(201).json(result);
});

const show = catchError(async (request, response) => {
    const { id } = request.params;

    const result = await Cart.findByPk(id);

    if (!result) return response.sendStatus(404);

    return response.json(result);
});

const destroy = catchError(async (request, response) => {
    const { id } = request.params;

    const result = await Cart.destroy({ where: { id } });

    if (!result) return response.sendStatus(404);

    return response.sendStatus(204);
});

const update = catchError(async (request, response) => {
    const { id } = request.params;

    const result = await Cart.update(
        request.body,
        { where: { id }, returning: true }
    );

    if (result[0] === 0) return response.sendStatus(404);

    return response.json(result[1][0]);
});

module.exports = { index, create, show, destroy, update };