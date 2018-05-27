const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipientSchema = new Schema({
    responded: {type: Boolean, default: false} ,
    email: String
    
});

module.exports = recipientSchema;


