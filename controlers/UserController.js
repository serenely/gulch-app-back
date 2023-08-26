import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

import UserModel  from "../models/User.js";

export const register = async (req, res)=>{
    try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10) // алгоритм шифрования пароля
    const hash = await bcrypt.hash(password, salt)

    const doc = new UserModel({
      fullName: req.body.fullName,
      email: req.body.email,
      paswordHash: hash, 
      address: req.body.address,
      avatarUrl: req.body.avatarUrl,
    })
    
    const user = await doc.save();

    const token = jwt.sign({
      _id: user._id
    }, 'secret123',
    {
      expiresIn:'30d'
    })

    const {paswordHash, ...userData} = user._doc

    res.json({...userData, token})
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message:'failed to register'
      })
    }
} 

export const login = async(req,res)=>{
    try {
      const user =  await UserModel.findOne({email: req.body.email})

      if(!user){
        return res.status(404).json({
          message: 'Wrong login or password '
        })
      }

      const isValidPass = await bcrypt.compare(req.body.password, user._doc.paswordHash)

      if(!isValidPass){
        return res.status(400).json({
          message: 'Wrong login or password '
        })
      }

      const token = jwt.sign({
        _id: user._id
      }, 'secret123',
      {
        expiresIn:'30d'
      })
  
      const {paswordHash, ...userData} = user._doc
  
      res.json({...userData, token})
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message:'failed to authorization'
        })
      }
  };

export const getMe = async (req, res)=>{
    try {
      const user = await UserModel.findById(req.userId)

      if(!user){
        return res.status(404).json({
          message: 'User not found'
        })
      }
      const {paswordHash, ...userData} = user._doc

      res.json(userData)
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message:'no data '
        })
      }
  }

export const getAllUsers = async (req, res ) => {
    try {
      const users = await UserModel.find().exec()
  
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message:'failed to get all users'
      })
    }
  }
  
export const remove = async (req, res) => {
    try {
      const userId = req.params.id;
  
      const removeUser = await UserModel.findOneAndDelete(
        { _id: userId },
      );
  
      if (!removeUser) {
        return res.status(404).json({
          message: 'User not found',
        });
      }
  
      res.json({
        success: true
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Do not get a user',
      });
    }
  };