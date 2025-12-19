import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Articles from "./pages/Articles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Doctors from "./pages/Doctors";
import HospitalMap from "./components/HospitalMap[1]";
import MedicalChatbot from "./pages/chatbox.jsx";

const isAuthenticated = () => {
  const token = localStorage.getItem("token"); 
  console.log("Is Authenticated:", token);
  return token !== null;
};

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const authenticated = isAuthenticated();
  console.log("PrivateRoute - IsAuthenticated:", authenticated); 

  return authenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

const RedirectToHome = () => {
  return <Navigate to="/" />;
};

const App = () => {
  return (
    <div className="mx-2 sm:mx-[6%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />} />

        <Route
          path="/doctors"
          element={
            <PrivateRoute>
              <Doctors />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctors/:speciality"
          element={
            <PrivateRoute>
              <Doctors />
            </PrivateRoute>
          }
        />
        <Route
          path="/article"
          element={
            <PrivateRoute>
              <Articles />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <Contact />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-profile"
          element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-appointments"
          element={
            <PrivateRoute>
              <MyAppointments />
            </PrivateRoute>
          }
        />
        <Route
          path="/chatbot"
          element={
            <PrivateRoute>
              <MedicalChatbot />
            </PrivateRoute>
          }
        />
        <Route
          path="/nearby-hospital"
          element={
            <PrivateRoute>
              <HospitalMap />
            </PrivateRoute>
          }
        />
        <Route
          path="/appointment/:docId"
          element={
            <PrivateRoute>
              <Appointment />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<RedirectToHome />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;