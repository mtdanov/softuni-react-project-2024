const Product = require('../models/Product');


exports.getAll = () => Product.find()



exports.create = async ({ title, image, price, description, category, type }) => {
    const p = await Product.create({ title, image, price, description, category, type })
    // console.log(p);
}

