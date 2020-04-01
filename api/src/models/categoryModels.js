const mongoose = require('mongoose');

const cagorySchema = mongoose.Schema({
    content: String,
    _id: mongoose.Schema.Types.ObjectId,
})
    .set('toJSON', {
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    });

module.exports = mongoose.model('Category', cagorySchema);