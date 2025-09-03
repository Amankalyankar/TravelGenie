import heroImage from '@/assets/hero-travel.jpg';
import { ArrowDownCircle } from 'lucide-react'; // 1. Import a clear icon

interface HeroSectionProps {
  onScrollToForm: () => void;
}

export const HeroSection = ({ onScrollToForm }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 hero-gradient opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 leading-tight">
          Discover Your Next
          <span className="block accent-gradient bg-clip-text text-transparent">
            Adventure
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          Let us create the perfect personalized itinerary for your dream destination. 
          From hidden gems to must-see attractions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onScrollToForm}
            className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 
                     transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Planning Your Trip
          </button>
        </div>
      </div>

      {/* --- FIX: Replaced the old icon with a better, clickable one --- */}
      {/* 2. The old scroll indicator is replaced with this new, improved version */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <button onClick={onScrollToForm} className="animate-bounce">
          <ArrowDownCircle className="w-10 h-10 text-white/70 hover:text-white transition-colors" />
        </button>
      </div>
    </section>
  );
};