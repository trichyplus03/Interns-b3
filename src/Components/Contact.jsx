import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
} from "lucide-react";

export default function Contact() {
  return (
    <section className="bg-slate-950 text-white min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-flex px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            Contact Us
          </span>

          <h1 className="mt-6 text-5xl md:text-7xl font-bold">
            Let's Move Your
            <span className="block text-cyan-400">
              Business Forward
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-slate-400 text-lg">
            Reach out to our logistics experts for reliable
            transportation and freight solutions.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              "500+ Deliveries",
              "99% Success",
              "24/7 Support",
              "10+ Countries",
            ].map((item) => (
              <div
                key={item}
                className="bg-slate-900/70 backdrop-blur-xl p-5 rounded-2xl border border-slate-800"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left */}
          <div className="space-y-6">
            {[
              {
                icon: <Phone />,
                title: "Phone",
                value: "+91 98765 43210",
              },
              {
                icon: <Mail />,
                title: "Email",
                value: "info@p2phaulier.com",
              },
              {
                icon: <MapPin />,
                title: "Location",
                value: "Chennai, Tamil Nadu",
              },
              {
                icon: <Clock />,
                title: "Working Hours",
                value: "24/7 Operations",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex gap-5"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  {item.icon}
                </div>

                <div>
                  <h3 className="font-semibold text-xl">
                    {item.title}
                  </h3>

                  <p className="text-slate-400">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h2 className="text-3xl font-bold">
              Send a Message
            </h2>

            <p className="text-slate-400 mt-2">
              Fill out the form and we'll get back to you.
            </p>

            <form className="mt-8 space-y-5">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none border border-slate-700"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none border border-slate-700"
              />

              <input
                type="text"
                placeholder="Company Name"
                className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none border border-slate-700"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full bg-slate-800 text-white p-4 rounded-xl outline-none border border-slate-700"
              />

              <button
                className="w-full bg-cyan-500 hover:bg-cyan-600 transition py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Map */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="h-[450px] rounded-3xl overflow-hidden border border-slate-800">
          <iframe
            title="location"
            width="100%"
            height="100%"
            loading="lazy"
            src="https://maps.google.com/maps?q=Chennai&t=&z=13&ie=UTF8&iwloc=&output=embed"
          />
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold">
            Ready to Ship Smarter?
          </h2>

          <p className="text-slate-400 mt-4">
            Partner with P2P Haulier for reliable and
            scalable logistics solutions.
          </p>

          <button className="mt-8 bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl font-semibold">
            Get Free Quote
          </button>
        </div>
      </div>
    </section>
  );
}