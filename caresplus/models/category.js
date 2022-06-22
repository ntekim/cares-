const { model, Schema } = require('mongoose');

const DrugCategoryModel = Schema({
    name: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    }
},{
    timestamps: true
});

module.exports = model('DrugCategory', DrugCategoryModel);