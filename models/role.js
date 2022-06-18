const { model, Schema } = require('mongoose');

const RoleModel = Schema({
    name: {
        type: String,
        enum: ['Patient', 'Pharmacist', 'Employee', 'Assistant', 'Admin', 'Manager'],
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