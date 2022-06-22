const { model, Schema } = require("mongoose");

const DrugSalesModel = Schema({
    totalAmount: {
        type: String,
        default: null
    },
    paymentType:{
        type: String,
        default: "Cash"
    },
    payedAmount: {
        type: String,
        default: null
    },
    discount: {
        type: String,
        default: null
    },
    remainingAmount: {
        type: String,
        default: null
    },
    regimen: [{
        type: Schema.Types.ObjectId,
        ref: "Regimen"
    }],
    pharmacist: {
        type: Schema.Types.ObjectId,
        ref: 'Pharmacist'
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: "Pharmacist"
    }
}, {
    timestamps: true
});

module.exports = model('Sales', DrugSalesModel);