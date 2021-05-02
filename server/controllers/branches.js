import express from 'express';
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import Beetle from '../models/beetle.js';
import bcrypt from 'bcrypt'

const router = express.Router();
const secret = 'mySecret';
export const getBranches = async (req, res) => {
    const {pincode} = req.params;
    
    try {
        const branches = await Beetle.find({pincodes:pincode},{password:0});
        res.status(200).json(branches);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const signin = async (req, res) => {
    const { branchName, password } = req.body;
    //console.log(req.body)
    try {
      const branch = await Beetle.findOne({ branchName });
  
      if (!branch) return res.json({ error: "Branch doesn't exist" });
  
      const isPasswordCorrect = await bcrypt.compare(password, branch.password);
  
      if (!isPasswordCorrect) return res.json({ error: "Invalid credentials" });
  
      const token = jwt.sign({ branchName: branch.branchName, id: branch._id }, secret, { expiresIn: "1h" });
  
      res.status(200).json({ result: branch, token });
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "Something went wrong" });
    }
  };