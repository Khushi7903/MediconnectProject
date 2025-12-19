import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {

    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

  return (
    <div className='flex flex-col items-center gap-6 my-8 text-gray-900 md:mx-12'>
      <h1 className='text-4xl font-semibold text-center'>Meet Our Top Doctors</h1>
      <p className='sm:w-2/3 text-center text-lg font-medium text-gray-600'>
        Explore a selection of our most trusted and experienced doctors ready to help you with your healthcare needs.
      </p>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 pt-5'>
        {doctors.slice(0, 5).map((item, index) => (
            <div onClick={() => navigate(`/appointment/${item._id}`)} className='border border-blue-300 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-2xl' key={index}>
                <img className='w-full h-56 object-cover bg-blue-50' src={item.image} alt={item.name} />
                <div className='p-6'>
                    <div className={`flex items-center justify-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-red-500'}`}>
                        <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></p>
                        <p>{item.available ? 'Available' : 'Unavailable'}</p>
                    </div>
                    <p className='text-xl font-semibold text-gray-900 text-center mt-2'>{item.name}</p>
                    <p className='text-gray-700 text-sm text-center'>{item.speciality}</p>
                </div>
            </div>
        ))}
      </div>
      <button 
        onClick={() => { navigate('/doctors'); scrollTo(0, 0); }} 
        className='bg-primary text-white px-10 py-3 rounded-full mt-8 hover:bg-blue-400 transition-all duration-300'
      >
        See All Doctors
      </button>
    </div>
  )
}

export default TopDoctors
