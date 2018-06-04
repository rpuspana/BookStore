const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type : String,
        validate: {
            validator: (v) => {
              return /^(\d{3}-\d{3}-\d{4})$/.test(v);
            },
            message: '{VALUE} is not a valid phone number! Valid number example: 123-323-2343'
        },
    }
});

const Store = mongoose.model('Store', storeSchema);

module.exports = {Store};