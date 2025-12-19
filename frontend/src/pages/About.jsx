import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070",
      description:
        "Leading our medical initiatives with over 15 years of experience in healthcare innovation.",
    },
    {
      name: "Dr. Michael Chen",
      role: "Head of Research",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070",
      description:
        "Spearheading research and development in telemedicine solutions.",
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Patient Care Director",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2070",
      description: "Ensuring excellence in patient care and service delivery.",
    },
    {
      name: "James Wilson",
      role: "Technical Director",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2074",
      description:
        "Managing our technical infrastructure and digital solutions.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Patients Served" },
    { number: "100+", label: "Medical Experts" },
    { number: "24/7", label: "Support Available" },
    { number: "95%", label: "Patient Satisfaction" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070"
            alt="Medical Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Transforming Healthcare Through Technology
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            We're on a mission to make healthcare more accessible, efficient,
            and patient-centered through innovative digital solutions.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission & Vision
              </h2>
              <p className="text-gray-600 mb-4">
                At MediConnect, we believe in a future where quality healthcare
                is accessible to everyone, anywhere. Our platform bridges the
                gap between patients and healthcare providers through innovative
                technology.
              </p>
              <p className="text-gray-600 mb-4">We're committed to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Improving healthcare accessibility</li>
                <li>Enhancing patient-doctor communication</li>
                <li>Ensuring data security and privacy</li>
                <li>Providing continuous innovation in healthcare</li>
              </ul>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2091"
                alt="Medical Technology"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Meet Our Leadership Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-64">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description:
                  "Continuously pushing boundaries in healthcare technology",
                icon: "🚀",
              },
              {
                title: "Patient-Centered",
                description: "Putting patients first in everything we do",
                icon: "💝",
              },
              {
                title: "Excellence",
                description:
                  "Maintaining the highest standards in healthcare delivery",
                icon: "⭐",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-8">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
