import mongoose from 'mongoose';

const beetleSchema = mongoose.Schema({
    institutioName : String,
    branchName : String,
    address : String,
    city : String,
    contactNumber : String,
    branchIncharge : String,
    pincodes:[String],
    password : String
})

var Beetle = mongoose.model('Beetle',beetleSchema);

export default Beetle;