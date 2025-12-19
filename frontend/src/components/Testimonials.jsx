import React, { useRef } from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Dr. John Doe',
      specialization: 'Cardiologist',
      feedback: 'The MediConnect platform has been an excellent tool for connecting with patients and managing appointments more efficiently. I highly recommend it!',
      image: 'https://media.istockphoto.com/id/177373093/photo/indian-male-doctor.jpg?s=612x612&w=0&k=20&c=5FkfKdCYERkAg65cQtdqeO_D0JMv6vrEdPw3mX1Lkfg=', 
    },
    {
      id: 2,
      name: 'Dr. Sarah Smith',
      specialization: 'Pediatrician',
      feedback: 'I’ve been using MediConnect for a few months now, and it has made my practice much more streamlined. The AI-based symptom checker is a great addition.',
      image: 'https://media.istockphoto.com/id/479378798/photo/portrait-of-female-doctor.jpg?s=612x612&w=0&k=20&c=P-W8KSJBYhYj2RSx1Zhff6FCGvtRDC3AAzox8deMmew=', 
    },
    {
      id: 3,
      name: 'Dr. Alan Brown',
      specialization: 'Orthopedic Surgeon',
      feedback: 'This platform is exactly what we needed to keep up with the modern healthcare demands. It’s simple, intuitive, and effective for both doctors and patients.',
      image: 'https://thumbs.dreamstime.com/b/male-doctor-stethoscope-38075856.jpg', 
    },
    {
      id: 4,
      name: 'Dr. Emily Clark',
      specialization: 'Dermatologist',
      feedback: 'MediConnect has transformed the way I interact with my patients. The interface is user-friendly, and the platform has streamlined my practice.',
      image: 'https://media.istockphoto.com/id/479378798/photo/portrait-of-female-doctor.jpg?s=612x612&w=0&k=20&c=P-W8KSJBYhYj2RSx1Zhff6FCGvtRDC3AAzox8deMmew=', 
    },
    {
      id: 5,
      name: 'Dr. Lisa Green',
      specialization: 'Neurologist',
      feedback: 'I love the AI-based symptom checker feature! It helps guide patients to the right diagnosis and makes consultations more effective.',
      image: 'https://media.istockphoto.com/id/479378798/photo/portrait-of-female-doctor.jpg?s=612x612&w=0&k=20&c=P-W8KSJBYhYj2RSx1Zhff6FCGvtRDC3AAzox8deMmew=', 
    },
    {
      id: 6,
      name: 'Dr. Michael Johnson',
      specialization: 'General Practitioner',
      feedback: 'This platform has simplified appointment management and patient communication. It’s a great tool for any healthcare provider.',
      image: 'https://media.istockphoto.com/id/177373093/photo/indian-male-doctor.jpg?s=612x612&w=0&k=20&c=5FkfKdCYERkAg65cQtdqeO_D0JMv6vrEdPw3mX1Lkfg=', 
    },
    {
      id: 7,
      name: 'Dr. Susan Davis',
      specialization: 'Gynecologist',
      feedback: 'MediConnect has truly improved the efficiency of my practice. The system is intuitive, and patients have found it very easy to use.',
      image: 'https://media.istockphoto.com/id/479378798/photo/portrait-of-female-doctor.jpg?s=612x612&w=0&k=20&c=P-W8KSJBYhYj2RSx1Zhff6FCGvtRDC3AAzox8deMmew=', 
    },
    {
      id: 8,
      name: 'Dr. Robert Lee',
      specialization: 'Surgeon',
      feedback: 'The platform has been invaluable for keeping track of appointments and patient records. I highly recommend it to other healthcare professionals.',
      image: 'https://media.istockphoto.com/id/177373093/photo/indian-male-doctor.jpg?s=612x612&w=0&k=20&c=5FkfKdCYERkAg65cQtdqeO_D0JMv6vrEdPw3mX1Lkfg=', 
    },
    {
      id: 9,
      name: 'Dr. Robert Lee',
      specialization: 'Surgeon',
      feedback: 'The platform has been invaluable for keeping track of appointments and patient records. I highly recommend it to other healthcare professionals.',
      image: 'https://media.istockphoto.com/id/177373093/photo/indian-male-doctor.jpg?s=612x612&w=0&k=20&c=5FkfKdCYERkAg65cQtdqeO_D0JMv6vrEdPw3mX1Lkfg=', 
    },
    {
      id: 10,
      name: 'Dr. Robert Lee',
      specialization: 'Surgeon',
      feedback: 'The platform has been invaluable for keeping track of appointments and patient records. I highly recommend it to other healthcare professionals.',
      image: 'https://media.istockphoto.com/id/177373093/photo/indian-male-doctor.jpg?s=612x612&w=0&k=20&c=5FkfKdCYERkAg65cQtdqeO_D0JMv6vrEdPw3mX1Lkfg=', 
    },
    {
      id: 11,
      name: 'Dr. Robert Lee',
      specialization: 'Surgeon',
      feedback: 'The platform has been invaluable for keeping track of appointments and patient records. I highly recommend it to other healthcare professionals.',
      image: 'https://media.istockphoto.com/id/177373093/photo/indian-male-doctor.jpg?s=612x612&w=0&k=20&c=5FkfKdCYERkAg65cQtdqeO_D0JMv6vrEdPw3mX1Lkfg=', 
    },
    {
      id: 12,
      name: 'Dr. Robert Lee',
      specialization: 'Surgeon',
      feedback: 'The platform has been invaluable for keeping track of appointments and patient records. I highly recommend it to other healthcare professionals.',
      image: 'https://media.istockphoto.com/id/177373093/photo/indian-male-doctor.jpg?s=612x612&w=0&k=20&c=5FkfKdCYERkAg65cQtdqeO_D0JMv6vrEdPw3mX1Lkfg=', 
    },
  ];

  const scrollRef = useRef(null);

  // Function to scroll to the next testimonial
  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth;
      scrollRef.current.scrollLeft += scrollAmount;
    }
  };

  // Function to scroll to the previous testimonial
  const scrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth;
      scrollRef.current.scrollLeft -= scrollAmount;
    }
  };

  return (
    <div className="p-6 max-w-full mx-auto pt-10">
      <h2 className="text-3xl font-medium text-center text-gray-900 mb-12">Testimonials</h2>

      <div className="relative">
        {/* Left arrow button */}
        <button
          onClick={scrollLeft}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary text-white p-4 rounded-full shadow-lg z-10 hover:bg-blue-500 transition duration-300"
        >
          <span className="text-xl">←</span>
        </button>

        <div className="overflow-x-auto flex space-x-8 py-4" ref={scrollRef}>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-blue-50 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 flex-none w-80"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4 transition-transform transform hover:scale-110 duration-300"
                />
                <div>
                  <p className="font-medium text-gray-600">{testimonial.name}</p>
                  <p className="text-gray-600">{testimonial.specialization}</p>
                </div>
              </div>
              <p className="text-gray-600 text-base">{testimonial.feedback}</p>
            </div>
          ))}
        </div>

        {/* Right arrow button */}
        <button
          onClick={scrollRight}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary text-white p-4 rounded-full shadow-lg z-10 hover:bg-blue-500 transition duration-300"
        >
          <span className="text-xl">→</span>
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
