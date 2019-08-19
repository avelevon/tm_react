const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const targetSchema = new Schema({
    sn: { type: String, required: false },
    name: { type: String, required: true },
    address: { type: String, required: false }
});


module.exports = mongoose.model('Target', targetSchema);