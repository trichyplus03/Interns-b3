import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import TrustedBy from './Components/TrustedBy'
import Footer from './Components/Footer'
import About from './Components/About'
import Contact from './Components/Contact'

function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <section id="features">
          <About />
        </section>
        <section id="storage" />
        <section id="pricing" />
        <section id="faq" />
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
