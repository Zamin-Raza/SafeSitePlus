// backend/controllers/SignupController.js
import Supervisor from "../models/Supervisor.js"; // Ensure this path is correct
import bcrypt from 'bcrypt'; // Importing bcrypt
import jwt from "jsonwebtoken"; 
import nodemailer from 'nodemailer';

import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

// const signup = async (req, res) => {
//     console.log("hn route chala");
//     try {
//         const { name, email, password } = req.body;

//         const user = await SignupModel.findOne({ email });

//         if (user) {
//             return res.status(409).json({ message: "USER already exists", success: false });
//         }

//         const image = req.file ? req.file.path : null;
//         const newuser = new SignupModel({ name, email, password, image });
//         newuser.password = await bcrypt.hash(password, 10);
//         await newuser.save();

//         res.status(201).json({ message: "Successfully registered", success: true });

//     } catch (err) {
//         res.status(500).json({
//             message: "Internal server error",
//             success: false
//         });
//     }
// }

export const ForgetPass = async (req,res)=>{
    console.log("chala hn bhai")
    const{email} = req.body;
    const requser = await Supervisor.findOne({email:email});
  
    
  
    if (!requser) {
      console.log("nahi milla email");
      return res.status(404).json({ message: 'Invalid Email' });
    }
    console.log(requser._id);
    const token = jwt.sign({userId : requser._id } , SECRET_KEY , {expiresIn : '1d'});
    console.log("token bna");
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'zaminraza095@gmail.com',
        pass: 'svtu pbaj nppi ynkf',
      }
    });
  
    var mailOptions = {
      from: 'zaminraza095@gmail.com',
      to: 'zaminraza095@gmail.com',
      subject: 'Recover Password ',
    
    
      text: `http://localhost:5173/recoverpassword/${requser._id}/${token}`
  
    };
    
    console.log(mailOptions.text);
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log("mail agyi hogi chala");
        return res.send({Status : "Success"});
      }
    });
  }



const login2 = async (req, res) => {
    try {
        const { email} = req.body;
        const user = await SignupModel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                name: user.name,
                image: user.image
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}

export const changedpass = async(req,res)=>{
    const{id,token} = req.params
    const {email} = req.body
  
    const user = await Supervisor.findOne({_id : id})
  
    if(!user){
      console.log("nahi milla");
    }
  
    const hash = await bcrypt.hash(email, 12);
    console.log(email);
    console.log(hash);
  
    user.password = hash;
  
    user.save();
  
    
  }



 export const login = async (req, res) => {
    console.log("login verify hony laga hy")
    try {
        const { email, password } = req.body;
        const user = await Supervisor.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name,
                // image: user.image
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}


// const userLogin = async (req,res) =>{
//     const{phoneNo} = req.body
//     const newphone = "+92"+phoneNo
//     var params = {
//         template : 'your login OTP is %token',
//         timeout : 300,
//         // originator: 'Zamin'
//       };
      
//       messagebird.verify.create(newphone, params, function (err, response) {
//         if (err) {
             
//            console.log("OTP SEND ERROR :" ,err);
//           res.status(200).send({"status":"failed", "message": "OTP Unable to send"})
//         }

//         res.status(200).send({"status":"Success", "message": "OTP SendSuccessfully" , "id": response.id})
//         console.log(response);
//       });

// }

// const verifyOTP = async (req,res) =>{
// const {id,otpcode} = req.body

// messagebird.verify.verify(id, otpcode, function (err, response) {
//   if (err) {
//      console.log("OTP VERIFICATION ERROR",err);
//      res.status(200).send({"status":"failed","message":"Invalid OTP"})
//   }
//   res.status(200).send({"status":"Success","message":"OTP Valid"})
//   console.log(response);
// });

// }



// module.exports = { signup, login , userLogin ,verifyOTP , login2};
