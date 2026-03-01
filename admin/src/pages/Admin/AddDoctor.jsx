import React, { useState, useContext } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevent page reload
    if (!docImg) {
      return toast.error('Image not Selected');
    }

    setLoading(true); // Set loading to true when submission starts

    try {
      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
        headers: { aToken },
      });

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName('');
        setPassword('');
        setEmail('');
        setAddress1('');
        setAddress2('');
        setDegree('');
        setAbout('');
        setFees('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
      console.error(error);
    } finally {
      setLoading(false); // Reset loading state after the request finishes
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-3 w-full">
      <p className="mb-4 text-2xl font-semibold">Add Doctor</p>

      <div className="bg-white px-6 py-6 border shadow-md rounded-lg w-full max-w-4xl">
        <div className="flex items-center gap-4 mb-6 text-gray-500">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-20 h-20 bg-gray-100 rounded-full object-cover"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Doctor"
            />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p>Upload doctor picture</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-600">Doctor Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-primary"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Doctor Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-primary"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Doctor Password</label>
              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-primary pr-10"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Experience</label>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-primary"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={`${i + 1} Year`}>
                    {i + 1} Year
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Fees</label>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-primary"
                type="number"
                placeholder="Fees"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-600">Speciality</label>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-primary"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Education</label>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-primary"
                type="text"
                placeholder="Education"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Address</label>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="w-full border rounded px-4 py-2 mb-2 focus:outline-none focus:ring focus:ring-primary"
                type="text"
                placeholder="Address 1"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-primary"
                type="text"
                placeholder="Address 2"
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="block mb-1 text-gray-600">About Doctor</label>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-primary"
            placeholder="Write about the doctor"
            rows={5}
            required
          />
        </div>

        <button
          type="submit"
          className={`bg-primary px-10 py-3 mt-4 text-white font-semibold rounded-full transition duration-200 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Add Doctor'}
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
