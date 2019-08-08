const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    userId: { type: String, required: true },
    targetId: { type: String, required: true },
    days: [{ type: Number, required: true }],
});


module.exports = mongoose.model('Schedule', scheduleSchema);