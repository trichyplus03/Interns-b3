import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    duration: "/Forever",
    features: [
      "5 GB Cloud Storage",
      "Image Upload",
      "Basic Sharing",
      "Community Support",
    ],
    featured: false,
  },
  {
    name: "Pro",
    price: "₹299",
    duration: "/month",
    features: [
      "500 GB Storage",
      "Unlimited Uploads",
      "WhatsApp Sharing",
      "Email Sharing",
      "Copy Link",
      "Priority Support",
    ],
    featured: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
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
            Simple Pricing
          </h2>

          <p className="text-gray-500 mt-4">
            Choose the perfect plan for storing and sharing your memories.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {plans.map((plan, index) => (
           <motion.div
  key={index}
  whileHover={{ y: -8 }}
  transition={{ duration: 0.3 }}
  className={`rounded-3xl p-8 shadow-lg border flex flex-col ${
    plan.featured
      ? "bg-gradient-to-br from-green-200 to-emerald-500 text-white"
      : "bg-green-100 text-green-500"
  }`}
>
           

              <h3 className="text-2xl font-bold">{plan.name}</h3>

              <div className="mt-4 flex items-end">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="ml-2">{plan.duration}</span>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check size={20} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
  className={`w-full mt-auto py-3 rounded-xl font-semibold transition ${
    plan.featured
      ? "bg-white text-green-700 hover:bg-green-100"
      : "bg-green-600 text-white hover:bg-green-700"
  }`}
>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}