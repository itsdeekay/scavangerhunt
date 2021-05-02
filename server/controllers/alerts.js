import express from 'express';
import mongoose from 'mongoose';
import AlertMessage from '../models/alert.js';

// For parsing excel data to mongodb collection

//import bcrypt from 'bcrypt';
// import excel from 'exceljs'
//import Beetle from '../models/beetle.js';


const router = express.Router();

export const getAlerts = async (req, res) => {
    try {
        const alertMessages = await AlertMessage.find().sort({createdAt:-1});
        res.status(200).json(alertMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getAlertsByPin = async (req, res) => { 
    const { pincodes } = req.query;
    try {
        const alertMessages = await AlertMessage.find({"pincode" : {$in : pincodes}}).sort({createdAt:-1});
        res.status(200).json(alertMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getAlert = async (req, res) => { 
    const { id } = req.params;
    try {
        const alert = await AlertMessage.findById(id);
        res.status(200).json(alert);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createAlert = async (req, res) => {
    const { contactDetails, pincode } = req.body;
    const newAlertMessage = new AlertMessage({ contactDetails, pincode,viewedBy :[] })
    try {
        await newAlertMessage.save();
        res.status(201).json(newAlertMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const updateAlert = async (req, res) => {
    const { id } = req.params;
    const {branchId} = req.body;
    console.log(id,branchId);
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const alert = await AlertMessage.findById(id);
 
    const updatedAlert = await AlertMessage.findByIdAndUpdate(id, { viewedBy: [...alert.viewedBy,branchId] }, { new: true });
    
    res.json(updatedAlert);
}

// For parsing excel data to mongodb collection

// export const saveRecords = async (req, res) => { 
//     const re = await Beetle.remove();
//     var workbook = new excel.Workbook();
//     workbook.xlsx.readFile('BeetleNut_Data.xlsx')
//     .then((data)=>{
//         var worksheet = data.getWorksheet('Sheet1');
//         worksheet.eachRow(async function(row, rowNumber) {

//             if(rowNumber>1){
//                 var row = row.values
//                 try {
//                     const oldBranch = await Beetle.findOne({ branchName:row[2] });

//                     if (!oldBranch){
//                         var hashedPassword = await bcrypt.hash(row[2] + '123', 12);
//                         var pin = row[7].toString().split(",").map(p=>p.trim());
//                         var beetleRow = await Beetle.create({
//                             institutionName: row[1],
//                             branchName : row[2],
//                             address : row[3],
//                             city : row[4],
//                             contactNumber : row[5],
//                             branchIncharge : row[6],
//                             pincodes:pin,
//                             password : hashedPassword
//                         })

//                     }
//                 } catch (error) {
//                     console.log(rowNumber," is not inserted",row[7])
//                     console.log(error)
//                 }
                
//             }
//           });
//         res.status(200).json({done:"Data Saved"});
//     })

// }


export default router;