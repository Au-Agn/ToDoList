const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    content: String,
    _id: mongoose.Schema.Types.ObjectId,
    checked: Boolean,
    categoryId: String,
    description: String
})
    .set('toJSON', {
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    });;

module.exports = mongoose.model('Task', taskSchema);