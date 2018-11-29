var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
    productName: String,
    price: Number,
    imageURL: String,
    orders: {type: Number, default: 0},
});

ProductSchema.methods.order = function(cb) {
    this.orders += 1;
    this.save(cb);
};

mongoose.model('Product', ProductSchema);