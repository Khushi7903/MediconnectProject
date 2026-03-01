import React, { useEffect, useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } =
    useContext(DoctorContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl mx-auto my-5 p-4">
      <p className="mb-5 text-2xl font-semibold text-gray-700">All Appointments</p>

      <div className="bg-white border rounded-lg shadow-lg overflow-hidden">
        {/* Header row for desktop */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-4 py-3 px-6 bg-gray-100 text-sm text-gray-600 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Appointment rows */}
        {appointments.reverse().map((item, index) => (
          <div
            className="flex flex-wrap justify-between items-center py-3 px-6 border-b hover:bg-gray-50 transition-all"
            key={index}
          >
            <p className="hidden sm:block">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img className="w-8 h-8 rounded-full" src={item.userData.image} alt="Patient" />
              <p className="text-gray-700">{item.userData.name}</p>
            </div>
            <p
              className={`text-xs px-2 py-1 rounded-full ${
                item.payment ? 'border-green-500 bg-green-100 text-green-700' : 'border-gray-500 bg-gray-100 text-gray-700'
              }`}
            >
              {item.payment ? 'Online' : 'CASH'}
            </p>
            <p className="hidden sm:block text-gray-700">{calculateAge(item.userData.dob)}</p>
            <p className="text-gray-700">{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <p className="text-gray-700">{currency}{item.amount}</p>
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs">Completed</p>
            ) : (
              <div className="flex gap-3">
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-6 cursor-pointer"
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  className="w-6 cursor-pointer"
                  src={assets.tick_icon}
                  alt="Complete"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
