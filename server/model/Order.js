const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    order: [
        {}
    ]
});

const Order = mongoose.model('Order', orderSchema)
module.exports = Order