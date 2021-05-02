import mongoose from 'mongoose';

const alertSchema = mongoose.Schema({
    contactDetails: String,
    pincode: Number,
    viewedBy: [String],
    createdAt: {
        type: Date,
        default:  Date.now,
    },
})

var AlertMessage = mongoose.model('AlertMessage', alertSchema);

export default AlertMessage;