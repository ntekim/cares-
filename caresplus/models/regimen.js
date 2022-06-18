const { model, Schema} = require("mongoose");

const RegimenModel = Schema({
    treatmentDuration: {
        type: String,
        default: null
    },
    drugs: [{
        type: Schema.Types.ObjectId,
        ref: 'Drugs',
        dosage: {
            type: String,
            default: null
        },
        interval: {
            type: String,
            default: null
        }
    }],
    pharmacist: {
        type: Schema.Types.ObjectId,
        ref: "Pharmacist"
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: "Patient"
    }
}, {
    timepstamps: true
});

module.exports = model('Regimen', RegimenModel);