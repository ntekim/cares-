const { model, Schema } = require('mongoose');
const PatientModel = Schema({
    firstname : {
        type: String,
        required: [true, "firstname is required"],
    },
    lastname: {
        type: String,
        required: [true, "lastname is required"],
    },
    password : {
        type: String,
        required: [true, "password is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    dob: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: "Nigeria"
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
    backup_email: {
        type: String,
        default: null
    },
    identificationNumber : {
        type: String,
        default: null,
        min: 11, 
        max: 11
    },
    assistants: [{
        type: Schema.Types.ObjectId,
        ref: 'Assistant'
    }],
    outlets: [{
        type: Schema.Types.ObjectId,
        ref: 'Outlet'
    }],
    pills: [{
        type: Schema.Types.ObjectId,
        ref: 'Pills'
    }],
    role: {
        type: Schema.Types.ObjectId,
        ref: "Role"
    }

});

module.exports = model('Patient', PatientModel)