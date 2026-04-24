import { useState } from 'react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Classes from './components/Classes';
import Transformations from './components/Transformations';
import Gallery from './components/Gallery';
import Plans from './components/Plans';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Certifications from './components/Certifications';
import DietGenerator from './components/DietGenerator';
import Supplements from './components/Supplements';
import BMICalculator from './components/BMICalculator';
import FitnessCharts from './components/FitnessCharts';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import SocialSection from './components/SocialSection';
import PromotionPopup from './components/PromotionPopup';

import SoundControl from './components/SoundControl';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className={`min-h-screen bg-[#080808] text-white overflow-x-hidden ${!loading ? 'lg:cursor-none' : ''}`}>
      <Preloader onComplete={() => setLoading(false)} />
      <PromotionPopup />
      
      {!loading && (
        <>
          <CustomCursor />
          <SoundControl />
          
          {/* Visually Hidden SEO Keywords Section (For Google Bots) */}
          <div className="sr-only">
            <h1>Best Gym in Thoothukudi - IRON EMPIRE CrossFit & Fitness Studio</h1>
            <h2>CrossFit Tamil Nadu, Weight Loss Program, Muscle Gain, Strength Training Thoothukudi</h2>
            <p>
              Looking for the best gym in Thoothukudi? IRON EMPIRE offers elite CrossFit training, 
              personal coaching, and science-backed nutrition plans in Tuticorin. 
              Join our fitness community for transformations, HIIT, powerlifting, and professional coaching. 
              The most advanced fitness center near you in Thoothukudi.
            </p>
            <ul>
              <li>Best CrossFit Studio in Thoothukudi</li>
              <li>Personal Training Tuticorin</li>
              <li>Weight Loss Centers Tamil Nadu</li>
              <li>Strength and Conditioning Experts</li>
              <li>HIIT and Cardio Training Thoothukudi</li>
            </ul>
          </div>

          <Navbar />
          <div className="animate-in">
            <Hero />
            <Marquee />
            <About />
            <Supplements />
            <Transformations />
            <Classes />
            <Gallery />
            <Plans />
            <Certifications />
            <FitnessCharts />
            <BMICalculator />
            <DietGenerator />
            <SocialSection />
            <Testimonials />
             <FAQ />
            <Contact />
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
