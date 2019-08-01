const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dateSchema = new Schema({
    year: { type: String, required: true },
    month: { type: String, required: true },
    day: { type: Number, required: true },
    weekDay: { type: String, required: true },
    weekNumber: { type: Number, required: true }
});

module.exports = mongoose.model('Date', dateSchema);