const mongoose = require('mongoose');

const ClergySchema = new mongoose.Schema({
    clergy_id : Schema.Types.ObjectId,
    personal_details : {
        firstname : {
            type: String, 
            trim: true,
            required : true,
            min: 3
        },
        lastname : {
            type: String,
            uppercase: true, 
            trim: true,
            required : true
        },
        date_of_birth : {
            type: Date,
            required: true,

        }
    },
    contact : '',
    address : ''
});

module.exports = mongoose.model('Clergy', ClergySchema);

