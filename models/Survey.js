const mongoose = require("mongoose");
const { Schema } = mongoose;
const recipientSchema = require("./Recipient");

const surveySchema = new Schema({
    title: String,
    subject: String,
    body: String,
    recipients: [recipientSchema],
    yes: {tyep: Number, default: 0},
    no: { tyep: Number, default: 0 },
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    dateSent: Date,
    lastResponded: Date
});

mongoose.model("surveys", serveySchema);
