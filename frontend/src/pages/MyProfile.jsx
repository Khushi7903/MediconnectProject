import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); // State to track update status

  const updateUserProfileData = async () => {
    setIsUpdating(true); // Disable button when the request starts
    try {
      const formData = new FormData();

      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);

      image && formData.append('image', image);

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsUpdating(false); // Re-enable button when the request completes
    }
  };

  return (
    userData && (
      <div className="max-w-lg mx-auto p-6 sm:p-10 bg-white shadow-lg rounded-lg flex flex-col gap-4 text-sm md:max-w-2xl">
        {isEdit ? (
          <label htmlFor="image" className="cursor-pointer self-center">
            <div className="relative w-36 h-36 rounded-full overflow-hidden border border-gray-300">
              <img
                className="object-cover w-full h-full"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <img className="w-8 h-8" src={assets.upload_icon} alt="Upload Icon" />
              </div>
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
          </label>
        ) : (
          <div className="self-center">
            <img src={userData.image} className="w-36 h-36 rounded-full border shadow-md object-cover" alt="Profile" />
          </div>
        )}

        {isEdit ? (
          <input
            className="bg-gray-100 text-2xl font-semibold rounded-lg px-4 py-2 border border-gray-300 w-full"
            type="text"
            value={userData.name}
            onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <p className="text-2xl font-semibold text-center text-neutral-800">{userData.name}</p>
        )}

        <hr className="my-4 border-gray-200" />
        <div>
          <p className="text-neutral-500 font-medium underline mb-3">Contact Information</p>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-y-3 text-neutral-700">
            <p className="font-medium">Email:</p>
            <p className="text-blue-500">{userData.email}</p>
            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="bg-gray-100 px-2 py-1 rounded-lg border border-gray-300"
                type="text"
                value={userData.phone}
                onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            ) : (
              <p className="text-blue-400">{userData.phone}</p>
            )}
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <div>
                <input
                  className="bg-gray-100 mb-1 px-2 py-1 rounded-lg border border-gray-300 w-full"
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                />
                <input
                  className="bg-gray-100 px-2 py-1 rounded-lg border border-gray-300 w-full"
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                />
              </div>
            ) : (
              <p className="text-gray-500">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>
        <div>
          <p className="text-neutral-500 font-medium underline mb-3">Basic Information</p>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-y-3 text-neutral-700">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                className="bg-gray-100 px-2 py-1 rounded-lg border border-gray-300"
                value={userData.gender}
                onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-400">{userData.gender}</p>
            )}
            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <input
                className="bg-gray-100 px-2 py-1 rounded-lg border border-gray-300"
                type="date"
                value={userData.dob}
                onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
              />
            ) : (
              <p className="text-gray-400">{userData.dob}</p>
            )}
          </div>
        </div>
        <div className="mt-8 text-center">
          <button
            className={`px-8 py-2 rounded-full transition-all font-medium ${
              isEdit
                ? "bg-primary text-white hover:bg-primary-dark"
                : "border border-primary text-primary hover:bg-primary hover:text-white"
            }`}
            onClick={isEdit ? updateUserProfileData : () => setIsEdit(true)}
            disabled={isUpdating} // Disable button if isUpdating is true
          >
            {isUpdating ? "Saving..." : isEdit ? "Save Information" : "Edit"}
          </button>
        </div>
      </div>
    )
  );
};

export default MyProfile;
