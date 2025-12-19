import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Example hospital data
const hospitals = [
    // Punjab and Chandigarh
    { id: 1, name: "PGIMER Chandigarh", lat: 30.7625, lng: 76.7821 },
    { id: 2, name: "Fortis Hospital Mohali", lat: 30.7046, lng: 76.7179 },
    { id: 3, name: "Dayanand Medical College and Hospital, Ludhiana", lat: 30.9120, lng: 75.8468 },
    { id: 4, name: "Christian Medical College, Ludhiana", lat: 30.9149, lng: 75.8493 },
    { id: 5, name: "Amandeep Hospital, Amritsar", lat: 31.6344, lng: 74.8723 },
  
    // Delhi NCR
    { id: 6, name: "AIIMS Delhi", lat: 28.5672, lng: 77.2100 },
    { id: 7, name: "Max Super Speciality Hospital, Saket", lat: 28.5243, lng: 77.2079 },
    { id: 8, name: "Fortis Escorts Heart Institute, Okhla", lat: 28.5545, lng: 77.2678 },
    { id: 9, name: "Medanta - The Medicity, Gurugram", lat: 28.3915, lng: 77.0468 },
    { id: 10, name: "BLK-Max Super Speciality Hospital, Delhi", lat: 28.6421, lng: 77.1856 },
  
    // Maharashtra
    { id: 11, name: "Lilavati Hospital, Mumbai", lat: 19.0592, lng: 72.8365 },
    { id: 12, name: "Kokilaben Dhirubhai Ambani Hospital, Mumbai", lat: 19.1347, lng: 72.8352 },
    { id: 13, name: "Ruby Hall Clinic, Pune", lat: 18.5342, lng: 73.8774 },
    { id: 14, name: "Sassoon General Hospital, Pune", lat: 18.5314, lng: 73.8656 },
    { id: 15, name: "Jaslok Hospital, Mumbai", lat: 18.9695, lng: 72.8093 },
  
    // Karnataka
    { id: 16, name: "Narayana Health, Bengaluru", lat: 12.8841, lng: 77.6476 },
    { id: 17, name: "Manipal Hospital, Bengaluru", lat: 12.9432, lng: 77.6225 },
    { id: 18, name: "St. John's Medical College Hospital, Bengaluru", lat: 12.9344, lng: 77.6155 },
    { id: 19, name: "BGS Gleneagles Global Hospitals, Bengaluru", lat: 12.9430, lng: 77.5395 },
    { id: 20, name: "Apollo Hospital, Bengaluru", lat: 12.9193, lng: 77.6109 },
  
    // Tamil Nadu
    { id: 21, name: "Christian Medical College, Vellore", lat: 12.9245, lng: 79.1356 },
    { id: 22, name: "Apollo Hospital, Chennai", lat: 13.0827, lng: 80.2707 },
    { id: 23, name: "Stanley Medical College Hospital, Chennai", lat: 13.0955, lng: 80.2863 },
    { id: 24, name: "Sri Ramachandra Medical Centre, Chennai", lat: 13.0355, lng: 80.1437 },
    { id: 25, name: "MIOT International, Chennai", lat: 13.0115, lng: 80.1948 },
  
    // Kerala
    { id: 26, name: "Amrita Institute of Medical Sciences, Kochi", lat: 10.0160, lng: 76.3234 },
    { id: 27, name: "Aster Medcity, Kochi", lat: 10.0486, lng: 76.2992 },
    { id: 28, name: "KIMS Health, Thiruvananthapuram", lat: 8.5241, lng: 76.9366 },
    { id: 29, name: "Medical Trust Hospital, Kochi", lat: 9.9687, lng: 76.2802 },
    { id: 30, name: "Sree Chitra Tirunal Institute, Thiruvananthapuram", lat: 8.5241, lng: 76.9366 },
  
    // Uttar Pradesh
    { id: 31, name: "Sanjay Gandhi Postgraduate Institute of Medical Sciences, Lucknow", lat: 26.8467, lng: 80.9462 },
    { id: 32, name: "King George's Medical University, Lucknow", lat: 26.8655, lng: 80.9198 },
    { id: 33, name: "Max Super Speciality Hospital, Vaishali", lat: 28.6538, lng: 77.2882 },
    { id: 34, name: "Medanta Hospital, Lucknow", lat: 26.8948, lng: 81.0090 },
    { id: 35, name: "Fortis Escorts Hospital, Agra", lat: 27.1767, lng: 78.0081 },
  ];
  
  

// Styling for the map container
const containerStyle = {
  width: "100%",
  height: "500px",
};

// Center of the map
const center = {
    lat: 30.7333, // Latitude for Punjab, India
    lng: 76.7794, // Longitude for Punjab, India
  };
  

const HospitalMap = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyBsw6K0gsJjRRy0xUavBlx95Wcbxg1AQjo">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {hospitals.map((hospital) => (
          <Marker 
            key={hospital.id} 
            position={{ lat: hospital.lat, lng: hospital.lng }} 
            title={hospital.name} 
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default HospitalMap;
