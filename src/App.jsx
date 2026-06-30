import React from "react";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-green-50">
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  );
}
export default App;