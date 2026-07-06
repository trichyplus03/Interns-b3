import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500">
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-300/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-5xl mx-auto px-6 text-center text-white">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold leading-tight"
        >
          Ready to Store and Share
          <br />
          Your Memories?
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-6 text-lg text-gray-100 max-w-2xl mx-auto"
        >
          Join thousands of photographers, creators, and businesses using our
          secure cloud platform to upload, organize, and share images with ease.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
        >
          <button className="px-8 py-4 rounded-full bg-white text-indigo-600 font-semibold hover:bg-gray-100 transition duration-300 flex items-center justify-center gap-2">
            Start Free
            <ArrowRight size={18} />
          </button>

          <button className="px-8 py-4 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-indigo-600 transition duration-300">
            View Pricing
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-8 mt-16"
        >
          <div>
            <h3 className="text-3xl font-bold">50K+</h3>
            <p className="text-gray-200 mt-2">Active Users</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">2M+</h3>
            <p className="text-gray-200 mt-2">Images Stored</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">99.9%</h3>
            <p className="text-gray-200 mt-2">Secure Storage</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}