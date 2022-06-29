const { model, Schema } = require('mongoose');

const RoleModel = Schema({
<<<<<<< HEAD
    title: {
        type: String,
        enum: ['patient', 'pharmacist', 'employee', 'assistant', 'admin', 'manager'],
=======
    name: {
        type: String,
        enum: ['Patient', 'Pharmacist', 'Employee', 'Assistant', 'Admin', 'Manager'],
>>>>>>> 220d4ea8353470919678c5527889bc6e4a3cc7d8
        default: 'Patient'
    },
    description: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

module.exports = model("Role", RoleModel);