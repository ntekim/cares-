const { model, Schema } = require('mongoose');

const RoleModel = Schema({
    title: {
        type: String,
        enum: ['patient', 'pharmacist', 'employee', 'assistant', 'admin', 'manager'],
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