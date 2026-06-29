import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How much free storage do I get?",
    answer:
      "The Free plan includes 5 GB of secure cloud storage for your images and files.",
  },
  {
    question: "Can I share images using WhatsApp?",
    answer:
      "Yes! Pro users can instantly share images via WhatsApp, Email, or by generating a shareable link.",
  },
  {
    question: "Is there an upload size limit?",
    answer:
      "The Free plan has basic upload limits, while the Pro plan supports larger file uploads and unlimited storage capacity.",
  },
  {
    question: "Can I upgrade my plan anytime?",
    answer:
      "Absolutely. You can upgrade or downgrade your subscription at any time without losing your existing data.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Your files are protected using secure cloud storage with encryption and regular backups.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-600 mt-4">
            Everything you need to know about our cloud storage platform.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left bg-white hover:bg-gray-50 transition"
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>

                {openIndex === index ? (
                  <Minus className="text-indigo-600" size={22} />
                ) : (
                  <Plus className="text-gray-500" size={22} />
                )}
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-7">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}