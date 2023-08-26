import express from "express"
import multer from "multer";
import mongoose from "mongoose";
import cors from "cors";

import { loginValidation,  productCreateValidation,  registerValidation } from "./validations.js";
import { UserController, ProductController} from "./controlers/index.js"
import {checkAuth, handleValidationErrors} from "./utils/index.js";

mongoose
.connect("mongodb+srv://boris:qqqqqq@cluster0.ytnb2du.mongodb.net/?retryWrites=true&w=majority")
.then(()=> console.log("DataBase ok"))
.catch(err => console.log("DataBase error", err))

const app = express();
const storage = multer.diskStorage({
  destination: (_,__, cb)=>{
    cb(null, 'uploads')
  },
  filename: (_,file,cb)=>{
    cb(null, file.originalname)
  }
})
const upload = multer({storage})

app.use(express.json()) // команда позволяет читать json, который будет приходить в запросах
app.use('/upload', express.static('uploads'))
app.use(cors());

app.post("/register", registerValidation, handleValidationErrors, UserController.register)
app.post('/login', loginValidation, handleValidationErrors, UserController.login)
app.get('/users', UserController.getAllUsers)
app.delete('/users/:id',checkAuth, UserController.remove)


app.post('/upload',checkAuth, upload.single('image'), (req, res)=>{
  res.json({
    url:`/uploads/${req.file.originalname}`
  })
})

app.get('/products', ProductController.getAll)
app.get('/product/:id', ProductController.getOne)
app.post('/products', productCreateValidation, ProductController.create)
app.delete('/products/:id', ProductController.remove)
app.patch('/products/:id', productCreateValidation, ProductController.update)

app.listen(4000, (err) =>{
    if (err){ 
      console.log(err );
    }
    console.log('Server is working... ');
  });