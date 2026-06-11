import React from 'react'
import { ArrowRight, BriefcaseBusiness, MapPin, Users } from 'lucide-react'

const Hero = () => {
  return (
    <section
      className="relative min-h-[92vh] overflow-hidden"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Content */}
      <div className="relative z-10 min-h-[92vh] grid grid-cols-1 lg:grid-cols-2 items-center gap-12 px-6 lg:px-16 py-12">
        
        {/* Left Side */}
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm font-semibold">
            <BriefcaseBusiness size={18} />
            Launch your career with real project experience
          </p>

          <h1 className="text-white text-5xl lg:text-7xl font-black leading-tight">
            Find internships that move your future forward.
          </h1>

          <p className="mt-6 text-gray-200 text-lg lg:text-xl leading-8 max-w-xl">
            Discover curated internship opportunities, build practical
            skills, and connect with teams looking for motivated
            early-career talent.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="#internships"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Explore Roles
              <ArrowRight size={18} />
            </a>

            <a
              href="#contact"
              className="px-6 py-3 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100 transition"
            >
              Contact Us
            </a>
          </div>

          <div className="flex gap-10 mt-12 flex-wrap">
            <div>
              <h3 className="text-4xl font-bold text-white">250+</h3>
              <p className="text-gray-300">Open Roles</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-white">80+</h3>
              <p className="text-gray-300">Partner Teams</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-white">12K</h3>
              <p className="text-gray-300">Student Profiles</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex justify-center">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80"
              alt="Internship"
              className="w-full h-64 object-cover"
            />

            <div className="p-6">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-4">
                Featured Role
              </span>

              <h2 className="text-2xl font-bold text-gray-900">
                Frontend Developer Intern
              </h2>

              <p className="mt-3 text-gray-600">
                Build responsive product screens using React, collaborate
                with designers, and gain real-world development experience.
              </p>

              <div className="flex items-center gap-6 mt-5 text-gray-500 text-sm">
                <span className="flex items-center gap-1">
                  <MapPin size={16} />
                  Remote
                </span>

                <span className="flex items-center gap-1">
                  <Users size={16} />
                  24 Applicants
                </span>
              </div>

              <button className="w-full mt-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                Apply Now
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero