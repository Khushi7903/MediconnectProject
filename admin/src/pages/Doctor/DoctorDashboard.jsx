import React, { useEffect, useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  PieController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { assets } from '../../assets/assets';

ChartJS.register(BarElement, PieController, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, completeAppointment, cancelAppointment } =
    useContext(DoctorContext);

  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  const barChartData = {
    labels: ['Earnings', 'Appointments'],
    datasets: [
      {
        label: 'Count',
        data: dashData ? [dashData.earnings, dashData.appointments] : [0, 0],
        backgroundColor: ['#007BFF', '#FFC107'],
        borderColor: ['#0056b3', '#d39e00'],
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
      y: { beginAtZero: true },
    },
  };

  const pieChartData = {
    labels: ['Appointments', 'Patients'],
    datasets: [
      {
        data: dashData ? [dashData.appointments, dashData.patients] : [0, 0],
        backgroundColor: ['#28A745', '#17A2B8'],
        hoverBackgroundColor: ['#218838', '#138496'],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`,
        },
      },
    },
  };

  return (
    dashData && (
      <div className="m-5 space-y-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: 'Earnings', value: `${currency} ${dashData.earnings}`, icon: assets.earning_icon },
            { label: 'Appointments', value: dashData.appointments, icon: assets.appointments_icon },
            { label: 'Patients', value: dashData.patients, icon: assets.patients_icon },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-blue-400 to-blue-300 text-white p-6 rounded-lg shadow hover:scale-105 transition-transform"
            >
              <img className="w-12 h-12 mb-4" src={stat.icon} alt={stat.label} />
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className="text-lg">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Earnings vs Appointments</h3>
            <Bar data={barChartData} options={barChartOptions} />
          </div>
          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Appointments vs Patients</h3>
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>

        {/* Latest Bookings */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex items-center gap-4 px-6 py-4 bg-gray-100 rounded-t">
            <img src={assets.list_icon} alt="Latest Bookings" />
            <p className="text-lg font-semibold text-gray-800">Latest Bookings</p>
          </div>
          <div className="divide-y">
            {dashData.latestAppointments.map((item, index) => (
              <div key={index} className="flex items-center px-6 py-4 hover:bg-gray-50">
                <img className="w-12 h-12 rounded-full" src={item.userData.image} alt="" />
                <div className="ml-4 flex-1">
                  <p className="text-gray-800 font-medium">{item.docData.name}</p>
                  <p className="text-gray-500 text-sm">{slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-600 text-sm font-semibold">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-600 text-sm font-semibold">Completed</p>
                ) : (
                  <div className="flex items-center gap-2">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-8 cursor-pointer"
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-8 cursor-pointer"
                      src={assets.tick_icon}
                      alt="Complete"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
