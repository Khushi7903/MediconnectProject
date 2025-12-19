import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-8">
      <h1 className="text-3xl text-gray-600 text-center">Browse Through Specialist Doctors</h1>
      <p className="text-gray-600 text-center mt-4">Select a speciality to filter doctors</p>

      <div className="flex flex-wrap gap-4 justify-center mt-6">
        {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((filter, index) => (
          <button key={index} onClick={() => speciality === filter ? navigate('/doctors') : navigate(`/doctors/${filter}`)}
            className={`py-2 px-6 border border-gray-300 rounded-full text-sm transition-all cursor-pointer
               ${speciality === filter
                ? 'bg-indigo-100 text-black'
                : 'bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-black'}`}> {filter}
          </button>
        ))}
      </div>

      <div className="w-full grid grid-cols-auto gap-4 gap-y-6 mt-10">
        {filterDoc.map((item, index) => (
          <div onClick={() => navigate(`/appointment/${item._id}`)}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            key={index}>
            <img className="bg-blue-50 w-full h-48 object-cover" src={item.image} alt="" />
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm ${
                  item.available ? 'text-green-500' : 'text-gray-500'
                }`} >
                <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500' } rounded-full`}></p>
                <p>{item.available ? 'Available' : 'Not Available'}</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
