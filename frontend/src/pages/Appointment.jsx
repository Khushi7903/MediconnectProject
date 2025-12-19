import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import RelatedDoctors from '../components/RelatedDoctors';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointments = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 1; i <= 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
        const isSlotAvailable = !docInfo.slots_booked[slotDate]?.includes(formattedTime);

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots(prev => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book an appointment');
      return navigate('/login');
    }

    try {
      const date = docSlots[slotIndex][0].datetime;
      const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;
      
      const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`, 
        { docId, slotDate, slotTime }, 
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  return docInfo && (
    <div className="container mx-auto p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-shrink-0">
            <img className="w-full sm:w-64 rounded-lg shadow-md" src={docInfo.image} alt={docInfo.name} />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              {docInfo.name} 
              <img className='w-5' src={assets.verified_icon} alt="Verified" />
            </h2>
            <p className="text-sm text-gray-600">{docInfo.degree} - {docInfo.speciality}</p>
            <span className="inline-block border border-gray-300 rounded-full text-xs py-1 px-2 mt-1">{docInfo.experience}</span>

            <h3 className="mt-4 text-lg font-semibold text-gray-800">About</h3>
            <p className="text-sm text-gray-500">{docInfo.about}</p>

            <p className="mt-4 font-medium text-gray-700">
              Appointment Fee: <span className="text-gray-600">{currencySymbol}{docInfo.fees}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 className="font-semibold text-xl text-gray-700">Booking Slots</h3>
        
        <div className="flex gap-4 overflow-x-auto mt-4">
          {docSlots.map((item, index) => (
            <div 
              key={index} 
              onClick={() => setSlotIndex(index)} 
              className={`text-center py-3 min-w-[60px] rounded-full cursor-pointer transition duration-200 ease-in-out ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-700 hover:bg-gray-100'}`}
            >
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 overflow-x-auto mt-4">
          {docSlots.length && docSlots[slotIndex].map((item, index) => (
            <p 
              key={index} 
              onClick={() => setSlotTime(item.time)} 
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition duration-200 ease-in-out ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300 hover:bg-gray-100'}`}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button 
          onClick={bookAppointment} 
          className='bg-primary text-white text-sm font-semibold px-14 py-3 rounded-full my-6 transition duration-200 ease-in-out hover:bg-opacity-80'
        >
          Book An Appointment
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointments;