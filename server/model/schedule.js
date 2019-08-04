const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    userId: { type: String, required: true },
    targetId: { type: String, required: true },
    startDay: { type: Number, required: true },
    endDay: { type: Number, required: true },
});


module.exports = mongoose.model('Schedule', scheduleSchema);