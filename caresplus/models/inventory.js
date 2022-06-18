const { model, Schema } =  require('mongoose');

const InventorySchema = Schema({
    drug: {
        type: Schema.Types.ObjectId, 
        ref: 'Drug'
    },
    qty: {
        type: String,
        default: null
    },
    manufacturer: {
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
    outlet: {
        type: Schema.Types.ObjectId,
        ref: 'Outlet'
    },
    supplier: {
        name: {
            type: String,
            default: null
        },
        phone: {
            type: String,
            default: null
        },
        email: {
            type: String,
            default: null
        },
        country: {
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
        }
    }
},{
    timestamps: true
});

module.exports = model('Inventories', InventorySchema);