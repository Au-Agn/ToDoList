const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    login: String,
    password: String,
    _id: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Task',userSchema);