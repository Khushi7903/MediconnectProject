// ES6 imports
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import { v2 as cloudinary } from 'cloudinary';
import razorpay from 'razorpay';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load .env variables
dotenv.config();

// Now you can use nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});


// API to register user
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // checking for all data to register user
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. of round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        sendMail(email, otp);
        console.log('otp is: ' + otp);
        await userModel.findByIdAndUpdate(newUser.id, { otp: otp} );
        res.json({ success: true, message: "otp sent successfully" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API for user login
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
            sendMail(email, otp);
            console.log('otp is: ' + otp);
            await userModel.findByIdAndUpdate(user.id, { otp: otp} );
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user profile
const getProfile = async(req,res) => {
    try {
        
        const {userId} = req.body

        const userData = await userModel.findById(userId).select('-password')

        res.json({success: true, userData})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// api to update user profile
const updateProfile = async(req,res) => {
    try {
        const {userId, name, phone, address, dob, gender} = req.body
        const imageFile = req.file

        if(!name || !phone || !dob || !gender){
            return res.json({success:false,message:"Data Missing"})
        }

        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

        if(imageFile){
            // upload image to cloudinary-
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageURL})
        }

        res.json({success:true, message:"Profile Updated"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API to book the appointment
const bookAppointment = async (req,res) => {
    try {
        const {userId, docId, slotDate, slotTime} = req.body

        const docData = await doctorModel.findById(docId).select('-password')
        
        // check if doctor is avaiable or not to take the bookings
        if(!docData.available){
            return res.json({success:false, message:'Doctor not available'})
        }

        let slots_booked = docData.slots_booked

        // checking for slots availability
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false, message:'Slot not available'})
            } else{
                slots_booked[slotDate].push(slotTime)
            }
        } else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data in doctors data
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})

        res.json({success:true,message:'Appointment Booked'})

    } catch (error) {
        console.log(error)
        res.json({success: true, message:error.message})
    }
}

// API to get user appointments for frontend my-appointments page
const listAppointments = async(req,res) => {

    try {
        const {userId} = req.body
        const appointments = await appointmentModel.find({userId})

        res.json({success: true, appointments})
    } catch (error) {
        console.log(error)
        res.json({success: false, message:error.message})
    }
}

// API to cancel appointment
const cancelAppointment = async(req,res) => {
    try {
        
        const {userId, appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        // verify appointment user
        if(appointmentData.userId !== userId){
            return res.json({success:false,message:'Unauthorized action'})
        }

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled: true})

        // releasing doctor slot 
        const {docId, slotDate, slotTime} = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
        
        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({success:true, message:'Appointment Cancelled'})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// API to make payment of appointment using razorpay
const paymentRazorpay = async(req,res) => {
    try {
        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
    
        if(!appointmentData || appointmentData.cancelled){
            return res.json({success: false, message: "Appointment Cancelled or not found"})
        }
    
        // creating options for razorpay payments
        const options = {
            amount : appointmentData.amount * 100,
            currency : process.env.CURRENCY,
            receipt : appointmentId,
        }
        // console.log(appointmentId)
        // creation of an order 
        const order = await razorpayInstance.orders.create(options)
    
        res.json({success: true, order})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// API to verify payment of razorpay
const verifyRazorpay = async(req,res) => {
    try {
        const {razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        
        if(orderInfo.status === 'paid'){
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {payment: true})
            res.json({success: true,message:"Payment Successful"})
        } else {
            res.json({success:false, message:"Payment Failed"})
        }

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}



const sendMail = async (email, otp) => {
    try {
        // create transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        // email content
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: "OTP Verification Required",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                    <h2 style="color: #333; text-align: center;">OTP Verification</h2>
                    <p style="font-size: 16px; color: #555;">
                        Hello, <br>
                        Please verify your account using the following OTP:
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                        <span style="font-size: 24px; color: #007bff; font-weight: bold; border: 1px solid #ddd; padding: 10px 20px; border-radius: 8px; background-color: #ffffff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                            ${otp}
                        </span>
                    </div>
                    <p style="font-size: 14px; color: #777;">
                        If you did not request this, please ignore this email.
                    </p>
                    <footer style="margin-top: 20px; text-align: center; font-size: 12px; color: #aaa;">
                        &copy; 2024 MediConnect. All rights reserved.
                    </footer>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};




export const generateUserOtp = async (req, res) => {

    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }
        
        const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        sendMail(email, otp);
        console.log('otp is: ' + otp);
        await userModel.findByIdAndUpdate(user.id, { otp: otp} );
        res.json({ success: true, message: "otp sent successfully." })
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const verifyUserOtp = async (req, res) => {
    try {
        const { email, password, otp } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password) && otp === user.otp;
        console.log ('otp in req ' + otp);
        console.log('otp in db: '+ user.otp);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export const resetUserPassword = async (req, res) => {

    try {
        const { email, password, otp } = req.body;

        // checking for all data to register user
        if (!email || !password || !otp) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            email,
            password: hashedPassword,
        }

        
        const user = await userModel.findOne({ email })
        if (user.otp === otp) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            await userModel.findByIdAndUpdate(user.id, { password: hashedPassword} );
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "otp didn't match" });
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointments, cancelAppointment, paymentRazorpay, verifyRazorpay,sendMail}