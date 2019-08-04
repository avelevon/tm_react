const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const targetSchema = new Schema({
    sn: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true }
});


module.exports = mongoose.model('Target', targetSchema);