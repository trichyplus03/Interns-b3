import { motion } from "framer-motion";
import {
  FaTruck,
  FaClock,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaTruck />,
      title: "Modern Fleet",
      desc: "Well-maintained vehicles for safe transportation.",
    },
    {
      icon: <FaClock />,
      title: "On-Time Delivery",
      desc: "Fast and reliable logistics solutions.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Transport",
      desc: "Safety and security for every shipment.",
    },
    {
      icon: <FaUsers />,
      title: "Expert Team",
      desc: "Professional drivers and logistics specialists.",
    },
  ];

  return (
    <section
  id="about"
  className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50"
>
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-16">
          <span className="text-primary font-semibold">
            ABOUT US
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-dark mt-4">
            Driving Logistics Excellence
          </h2>

          <p className="max-w-3xl mx-auto text-gray-600 mt-4 md:mt-6 text-sm md:text-base px-2">
            P2P Haulier & Services is a trusted transportation
            and logistics partner dedicated to delivering
            reliable, secure, and cost-effective solutions.
          </p>
        </div>

       <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left Image */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d"
              alt="Transport"
              className="rounded-3xl shadow-2xl w-full h-64 md:h-auto object-cover"
            />
          </motion.div>

          {/* Right Content */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-4xl font-bold text-dark mb-4 md:mb-6">
              Reliable Transport Solutions For Every Business
            </h3>

            <p className="text-gray-600 text-sm md:text-base leading-7 md:leading-8 mb-4">
              We specialize in freight transportation,
              logistics management, express delivery,
              and supply chain solutions. Our commitment
              to safety, efficiency, and customer
              satisfaction has made us a preferred
              logistics partner.
            </p>

            <p className="text-gray-600 leading-8 mb-8">
              Whether transporting goods locally or
              managing large-scale logistics operations,
              our experienced team ensures seamless
              delivery with professionalism and care.
            </p>

            {/* Stats */}

            <div className="grid grid-cols-2 gap-6 mb-10">

              <div>
               <h4 className="text-2xl md:text-4xl font-bold text-primary">
                  500+
                </h4>
                <p className="text-xs md:text-base text-gray-600">
                  Deliveries Completed
                </p>
              </div>

              <div>
                <h4 className="text-2xl md:text-4xl font-bold text-primary">
                  100+
                </h4>
                <p className="text-xs md:text-base text-gray-600">
                  Happy Clients
                </p>
              </div>

            </div>

           <button className="bg-primary text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:scale-105 duration-300 text-sm md:text-base">
              Learn More
            </button>

          </motion.div>

        </div>

        {/* Features */}

       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mt-12 md:mt-20">

          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
              }}
              className="bg-white p-4 md:p-8 rounded-3xl shadow-lg hover:-translate-y-2 hover:shadow-2xl duration-300"
            >
              <div className="text-primary text-2xl md:text-4xl mb-3 md:mb-4">
                {item.icon}
              </div>

          <h4 className="font-bold text-sm md:text-xl mb-2 md:mb-3">
                {item.title}
              </h4>

              <p className="text-gray-600 text-xs md:text-base">
                {item.desc}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default About;