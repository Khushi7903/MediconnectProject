import express from 'express'
import { bookAppointment, cancelAppointment, generateUserOtp, getProfile, listAppointments, loginUser, paymentRazorpay, registerUser, resetUserPassword, updateProfile, verifyRazorpay, verifyUserOtp } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/otp/gen', generateUserOtp)
userRouter.post('/otp/verify', verifyUserOtp)
userRouter.post('/reset', resetUserPassword)

userRouter.get('/get-profile',authUser, getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointments)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/payment-razorpay', authUser, paymentRazorpay)
userRouter.post('/verifyRazorpay',authUser,verifyRazorpay)

export default userRouter  