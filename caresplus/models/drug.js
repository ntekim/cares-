const { model, Schema } =  require('mongoose');

const DrugSchema = Schema({
    name: {
        type: String,
        default: null
    },
    scientificName: {
        type: String,
        default: null
    },
    storageTemperature: {
        type: String,
        default: null
    },
    NB: {
        type: String,
        default: "Keep out of reach of Children"
    },
    categories: [{
        type: Schema.Types.ObjectId, 
        ref: 'Category'
    }],
},{
    timestamps: true
});

module.exports = model('Drug', DrugSchema);