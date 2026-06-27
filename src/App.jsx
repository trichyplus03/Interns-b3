import React from "react";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import "./App.css";

function App() {
  return (
    <div>
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  );
}

export default App;