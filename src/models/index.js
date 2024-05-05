const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Cart = require('./Cart');
const Purchase = require('./Purchase');

Category.hasMany(Product);
Product.belongsTo(Category);

User.hasMany(Cart);
Cart.belongsTo(User);

Product.hasMany(Cart);
Cart.belongsTo(Product);

User.hasMany(Purchase);
Purchase.belongsTo(User);

Product.hasMany(Purchase);
Purchase.belongsTo(Product);