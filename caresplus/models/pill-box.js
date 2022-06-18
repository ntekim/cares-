const { model, Schema } =  require('mongoose');

const PillSchema = Schema({
    qty: {
        type: String,
        default: null
    },
    manufactureDate: {
        type: String,
        default: null
    },
    expiryDate: {
        type: String,
        default: null
    },
    unitPrice: {
        type: String,
        default: null
    },
    drug: {
        type: Schema.Types.ObjectId, 
        ref: 'Drug'
    },
    outlet: {
        type: Schema.Types.ObjectId,
        ref: 'Outlet'
    },
    patient: {
        type: Schema.Types.ObjectId, 
        ref: 'Patient'
    },
},{
    timestamps: true
});

module.exports = model('Pills', PillSchema);