const {model, Schema} = require('mongoose');

const OutletModel = Schema({
    name: {
        type: String,
        default: null
    },
    desc: {
        type: String,
        default: 'Main Outlet'
    },
    country: {
        type: String,
        default: 'Nigeria'
    },
    state: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    business: {
        registrationDocument: {
            type: String,
            default: null
        },
        photo: {
            type: String,
            default: null
        },
    },
    Pharmacist: [{
        type: Schema.Types.ObjectId,
        ref: 'Pharmacist'
    }],
    Employees: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    Patients: [{
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }],
    Inventories: [{
        type: Schema.Types.ObjectId,
        ref: 'Inventories'
    }]
});

module.exports = model('Outlet', OutletModel);