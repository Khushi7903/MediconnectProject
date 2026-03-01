import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
        name: profileData.name,
        about: profileData.about,
      };

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } });

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return profileData && (
    <div className="container mx-auto px-4 py-8">

      <div className="flex flex-col gap-8 bg-white p-6 rounded-lg shadow-lg">
        
        <div className="flex justify-center">
          <img className="w-32 h-32 object-cover rounded-full" src={profileData.image} alt="Doctor" />
        </div>

        <div className="flex flex-col items-start gap-4">
          {/* Name Section */}
          <div className="flex items-center justify-between w-full">
            <h2 className="text-3xl font-semibold text-gray-800">
              {isEdit ? 
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 border rounded-md text-xl"
                /> 
                : profileData.name}
            </h2>
            <div>
              {isEdit ? (
                <button onClick={updateProfile} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save</button>
              ) : (
                <button onClick={() => setIsEdit(true)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Edit</button>
              )}
            </div>
          </div>

          {/* Degree and Experience Section */}
          <div className="flex items-center gap-3 text-gray-600">
            <p className="text-sm px-2 py-1 bg-gray-200 rounded-full">{profileData.degree} - {profileData.speciality}</p>
            <span className="text-sm">{profileData.experience} years experience</span>
          </div>

          {/* About Section */}
          <div className="w-full mt-4">
            <p className="text-lg font-medium text-gray-700">About</p>
            {isEdit ? (
              <textarea
                value={profileData.about}
                onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                className="w-full p-4 mt-2 border rounded-md"
                rows="4"
              />
            ) : (
              <p className="text-sm text-gray-600 mt-2">{profileData.about}</p>
            )}
          </div>

          {/* Fees Section */}
          <div className="flex items-center gap-2 mt-4">
            <p className="font-medium text-gray-700">Appointment Fee:</p>
            <span className="text-xl text-gray-800">
              {currency}{isEdit ? 
                <input 
                  type="number"
                  value={profileData.fees}
                  onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                  className="w-24 p-2 border rounded-md"
                /> 
                : profileData.fees}
            </span>
          </div>

          {/* Address Section */}
          <div className="mt-4 w-full">
            <p className="font-medium text-gray-700">Address:</p>
            <div>
              {isEdit ? (
                <>
                  <input
                    type="text"
                    value={profileData.address.line1}
                    onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                    className="w-full p-2 mt-2 border rounded-md"
                    placeholder="Address Line 1"
                  />
                  <input
                    type="text"
                    value={profileData.address.line2}
                    onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                    className="w-full p-2 mt-2 border rounded-md"
                    placeholder="Address Line 2"
                  />
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-600 mt-2">{profileData.address.line1}</p>
                  <p className="text-sm text-gray-600 mt-1">{profileData.address.line2}</p>
                </>
              )}
            </div>
          </div>

          {/* Availability Section */}
          <div className="flex items-center mt-4 gap-2">
            <input
              type="checkbox"
              checked={profileData.available}
              onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
              className="h-5 w-5 text-blue-600"
            />
            <label className="text-sm text-gray-600">Available</label>
          </div>

        </div>

      </div>

    </div>
  );
};

export default DoctorProfile;
