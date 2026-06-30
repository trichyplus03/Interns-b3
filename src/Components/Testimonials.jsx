import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "John David",
    role: "Photographer",
    image: "https://i.pravatar.cc/150?img=11",
    review:
      "This platform makes storing and sharing images incredibly easy. The interface is clean, fast, and reliable.",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    role: "Content Creator",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "I love the cloud storage and instant sharing options. It's become my go-to platform for managing photos.",
  },
  {
    id: 3,
    name: "Rahul Kumar",
    role: "Freelancer",
    image: "https://i.pravatar.cc/150?img=15",
    review:
      "The upload speed and modern UI are excellent. Sharing images with clients is now effortless.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            Loved by Thousands
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover why creators, photographers, and businesses trust our
            platform for secure image storage and effortless sharing.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              {/* User */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mt-6 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-600 mt-5 leading-7">
                "{item.review}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}