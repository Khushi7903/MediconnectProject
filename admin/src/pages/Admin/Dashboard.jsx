import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { assets } from '../../assets/assets';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  // Histogram Data (Doctors vs Patients)
  const histogramData = {
    labels: ['Doctors', 'Patients'],
    datasets: [
      {
        label: 'Count',
        data: [dashData.doctors, dashData.patients],
        backgroundColor: '#36a2eb',
        borderColor: '#36a2eb',
        borderWidth: 1,
        barThickness: 60,
        maxBarThickness: 70,
      },
    ],
  };

  const histogramOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        grid: { drawBorder: false },
      },
    },
  };

  // Bar Chart Data (Appointments vs Doctors)
  const barChartData = {
    labels: ['Appointments vs Doctors'],
    datasets: [
      {
        label: 'Appointments',
        data: [dashData.appointments],
        backgroundColor: '#ffcc00',
        borderColor: '#ffcc00',
        borderWidth: 1,
      },
      {
        label: 'Doctors',
        data: [dashData.doctors],
        backgroundColor: '#36a2eb',
        borderColor: '#36a2eb',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        grid: { drawBorder: false },
      },
    },
  };

  return (
    dashData && (
      <div className="m-6 space-y-8">
        {/* Statistics Section */}
        <div className="flex flex-wrap gap-5">
          {[{ icon: assets.doctor_icon, count: dashData.doctors, label: 'Doctors' },
            { icon: assets.appointments_icon, count: dashData.appointments, label: 'Appointments' },
            { icon: assets.patients_icon, count: dashData.patients, label: 'Patients' }].map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-gradient-to-br from-blue-100 to-blue-50 p-5 w-64 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <img className="w-16" src={stat.icon} alt={`${stat.label} icon`} />
              <div>
                <p className="text-2xl font-bold text-blue-600">{stat.count}</p>
                <p className="text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section (Histogram on Left and Bar Chart on Right) */}
        <div className="flex gap-8">
          {/* Histogram Section */}
          <div className="bg-white p-5 rounded shadow w-1/2">
            <h3 className="text-xl font-semibold text-gray-600 mb-3">Doctors vs Patients Histogram</h3>
            <Bar data={histogramData} options={histogramOptions} />
          </div>

          {/* Bar Chart Section */}
          <div className="bg-white p-5 rounded shadow w-1/2">
            <h3 className="text-xl font-semibold text-gray-600 mb-3">Appointments vs Doctors Bar Chart</h3>
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>

        {/* Latest Bookings Section */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex items-center gap-3 px-6 py-4 bg-primary text-white rounded-t-lg">
            <img className="w-6" src={assets.list_icon} alt="List Icon" />
            <p className="font-semibold">Latest Bookings</p>
          </div>
          <div className="divide-y divide-gray-200">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-6 py-4 gap-4 hover:bg-gray-50 transition-colors"
              >
                <img
                  className="rounded-full w-12 h-12 object-cover"
                  src={item.docData.image}
                  alt={item.docData.name}
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item.docData.name}</p>
                  <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-500 text-xs font-bold">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-600 text-xs font-bold">Completed</p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-8 cursor-pointer hover:opacity-80"
                    src={assets.cancel_icon}
                    alt="Cancel Icon"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
