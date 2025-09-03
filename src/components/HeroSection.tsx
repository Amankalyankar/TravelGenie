import heroImage from '@/assets/hero-travel.jpg';

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
          Let AI create the perfect personalized itinerary for your dream destination. 
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
          
          <button
            onClick={onScrollToForm}
            className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg 
                     hover:bg-white hover:text-primary transform hover:scale-105 
                     transition-all duration-300"
          >
            Learn More
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};