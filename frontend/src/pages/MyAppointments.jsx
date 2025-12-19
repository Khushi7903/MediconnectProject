// import React, { useContext, useEffect, useState } from 'react'
// import { AppContext } from '../context/AppContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import {useNavigate} from 'react-router-dom'

// const MyAppointments = () => {

//   const {backendUrl, token, getDoctorsData} = useContext(AppContext)

//   const [appointments,setAppointments] = useState([])
  
//   const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

//   const navigate = useNavigate()

//   const slotDateFormat = (slotDate) => {
//     const dateArray = slotDate.split('_')
//     return dateArray[0]+" "+months[Number(dateArray[1])] + " " +dateArray[2]
//   }

//   const getUserAppointments = async() => {

//     try {
//       const {data} = await axios.get(backendUrl + '/api/user/appointments',{headers: {token}})

//       if(data.success){
//         setAppointments(data.appointments.reverse())
//         console.log(data.appointments)
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }
//   }

//   const cancelAppointment = async(appointmentId) => {

//     try {
//       const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment',{appointmentId},{headers:{token}})

//       if(data.success){
//         toast.success(data.message)
//         getUserAppointments()
//         getDoctorsData()
//       } else{
//         toast.error(data.message)
//       }

//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }
//   }

//   const initPay = (order) => {
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: order.currency,
//       name: 'Appointment Payment',
//       description: 'Appointment Payment',
//       order_id: order.id,
//       receipt: order.receipt,
//       handler: async(response) => {
//         console.log(response)

//         try {
//           const {data} = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, {headers:{token}})     
//           if(data.success){
//             getUserAppointments()
//             navigate('/my-appointments')  
//           }
//         } catch (error) {
//           console.log(error);
//           toast.error(error.message)
//         }
//       }
//     }

//     const rzp = new window.Razorpay(options)
//     rzp.open()
//   }

//   const appointmentRazorpay = async(appointmentId) => {
//     try {
//       const {data} = await axios.post(backendUrl + '/api/user/payment-razorpay',{appointmentId},{headers: {token}})

//       if(data.success){
//         initPay(data.order)
//       }
//     } catch (error) {
      
//     }
//   }

//   useEffect(()=>{
//     if(token){
//       getUserAppointments()
//     }
//   },[token])

//   return (
//     <div>
//       <p>My appointments</p>
//       <div>
//         {appointments.map((item,index)=>(
//           <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
//             <div>
//               <img className='w-32 bg-indigo-50' src={item.docData.image} alt=""/>
//             </div>
//             <div className='flex-1 text-zinc-600'>
//               <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
//               <p>{item.docData.speciality}</p>
//               <p className='text-zinc-700 font-medium mt-1'>Address:</p>
//               <p className='text-xs'>{item.docData.address.line1}</p>
//               <p className='text-xs'>{item.docData.address.line2}</p>
//               <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
//             </div>
//             <div></div>
//             <div className='flex flex-col gap-2 justify-end'>
//               {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50'>Paid</button>}
//               {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={()=> appointmentRazorpay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
//               {!item.cancelled && !item.isCompleted && <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-400 hover:text-white transition-all duration-300'>Cancel Appointment</button>}
//               {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button>}
//               {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default MyAppointments



import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [payment, setPayment] = useState("");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      setAppointments(data.appointments.reverse());
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            navigate("/my-appointments");
            getUserAppointments();
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  return (
    
    <>
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold text-gray-700 mb-6 border-b pb-3">
        My Appointments
      </h1>
      <div className="space-y-6">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-6 p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1"
          >
            {/* Doctor Image */}
            <div className="flex-shrink-0">
              <img
                src={item.docData.image}
                alt={item.docData.name}
                className="w-36 h-36 object-cover rounded-lg bg-primary transition-transform hover:scale-110"
              />
            </div>

            {/* Appointment Details */}
            <div className="flex-1 bg-slate-100">
              <h2 className="text-xl font-semibold text-gray-800">
                {item.docData.name}
              </h2>
              <p className="text-gray-600">{item.docData.speciality}</p>
              <p className="mt-2 text-gray-500">
                <span className="font-medium">Address:</span>{" "}
                {item.docData.address.line1}, {item.docData.address.line2}
              </p>
              <p className="mt-2 text-gray-600">
                <span className="font-medium text-gray-700">Date & Time:</span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-center justify-center gap-3">
              {!item.cancelled &&
                !item.payment &&
                !item.isCompleted &&
                payment !== item._id && (
                  <button
                    onClick={() => setPayment(item._id)}
                    className="w-40 px-4 py-2 border rounded-md text-gray-600 hover:bg-primary hover:text-white transition-all"
                  >
                    Pay Online
                  </button>
                )}

              {!item.cancelled && !item.payment && payment === item._id && (
                <button
                  onClick={() => appointmentRazorpay(item._id)}
                  className="w-40 px-4 py-2 flex items-center justify-center border rounded-md hover:bg-primary hover:text-white transition-all"
                >
                  <img
                    src={assets.razorpay_logo}
                    alt="Razorpay"
                    className="h-5 mr-2"
                  />
                  Razorpay
                </button>
              )}

              {item.payment && !item.isCompleted && (
                <span className="w-40 py-2 text-center bg-green-100 text-green-600 border border-green-500 rounded-md">
                  Paid
                </span>
              )}

              {item.isCompleted && (
                <span className="w-40 py-2 text-center bg-gray-100 text-gray-600 border rounded-md">
                  Completed
                </span>
              )}

              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="w-40 px-4 py-2 border rounded-md text-red-500 hover:bg-red-500 hover:text-white transition-all"
                >
                  Cancel Appointment
                </button>
              )}

              {item.cancelled && (
                <span className="w-40 py-2 text-center bg-red-100 text-red-500 border border-red-500 rounded-md">
                  Cancelled
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default MyAppointments;