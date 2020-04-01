const Category = require('../models/categoryModels');

module.exports = {
    find: (params, callback) => {
        Category.find(params, (err, result) => {
            if (err){
                callback(err, null);
                return;
            }
            callback(null, result);
        })
    },

    findById: (id, callback) => {
        Category.findById(id, (err, result) => {
            if (err){
                callback(err, null);
                return;
            }
            callback(null, result);
        })
    }
}
