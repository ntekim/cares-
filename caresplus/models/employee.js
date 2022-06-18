const { model, Schema } = require('mongoose');

const EmployeeSchema = Schema({
    firstName : {
        type: String,
        required: [true, "Firstname is required"],
    },
    lastName: {
        type: String,
        required: [true, "Lastname is required"],
    },
    password : {
        type: String,
        required: [true, "Password is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    photo: {
        type: String,
        default: null
    },
    dob: {
        type: String,
        default: null
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
    identificationNumber : {
        type: String,
        default: null,
        min: 11, 
        max: 11
    },
    status: {
        type: Boolean,
        default: 1
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: "Role"
    },
    outlets: [{
        type: Schema.Types.ObjectId,
        ref: 'Outlet'
    }],    
});

module.exports = model('Employee', EmployeeSchema);