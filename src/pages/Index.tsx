import { useState, useRef } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { TravelForm } from '@/components/TravelForm';
import { LoadingState } from '@/components/LoadingState';
import { ItineraryDisplay } from '@/components/ItineraryDisplay';

interface TravelFormData {
  destination: string;
  duration: string;
  interests: string;
}

type AppState = 'form' | 'loading' | 'result';

const Index = () => {
  const [state, setState] = useState<AppState>('form');
  const [itinerary, setItinerary] = useState<string>('');
  const [currentDestination, setCurrentDestination] = useState<string>('');
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = async (formData: TravelFormData) => {
    setState('loading');
    setCurrentDestination(formData.destination);
    
    // Simulate API call - replace with actual API integration
    try {
      // Mock API response for demonstration
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockItinerary = `🌟 ${formData.destination} - ${formData.duration} Itinerary

📍 Day 1: Arrival & First Impressions
• Arrive and check into your accommodation
• Take a leisurely walk around the city center
• Visit a local café for authentic cuisine
• Evening: Sunset viewing at a scenic spot

📍 Day 2: Cultural Exploration
Based on your interest in ${formData.interests}:
• Morning: Visit the main cultural attractions
• Afternoon: Guided tour of historical sites
• Evening: Local restaurant experience

📍 Day 3: Adventure & Activities
• Outdoor activities based on your preferences
• Local market exploration
• Hands-on cultural experience
• Evening: Entertainment district

📍 Day 4: Hidden Gems
• Off-the-beaten-path locations
• Local artisan workshops
• Traditional food tour
• Photography spots

📍 Day 5: Relaxation & Departure
• Final shopping for souvenirs
• Spa or relaxation time
• Last-minute exploration
• Departure preparations

💡 Local Tips:
• Best times to visit popular attractions
• Transportation recommendations
• Cultural etiquette to keep in mind
• Emergency contacts and useful phrases

This itinerary is customized based on your interests in ${formData.interests} and designed for your ${formData.duration} stay in ${formData.destination}.`;

      setItinerary(mockItinerary);
      setState('result');
    } catch (error) {
      console.error('Error generating itinerary:', error);
      setState('form');
    }
  };

  const handleBackToForm = () => {
    setState('form');
    setItinerary('');
    setCurrentDestination('');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - only show when in form state */}
      {state === 'form' && <HeroSection onScrollToForm={scrollToForm} />}
      
      {/* Main Content */}
      <main className="py-16 px-6">
        <div ref={formRef} className="container mx-auto">
          {state === 'form' && (
            <div className="space-y-12">
              <div className="text-center animate-slide-up">
                <h2 className="text-4xl font-playfair font-bold text-foreground mb-4">
                  Ready to Explore?
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Tell us about your dream destination and let our AI create a personalized 
                  itinerary that matches your interests and travel style.
                </p>
              </div>
              <TravelForm onSubmit={handleFormSubmit} isLoading={false} />
            </div>
          )}
          
          {state === 'loading' && (
            <div className="flex justify-center">
              <LoadingState />
            </div>
          )}
          
          {state === 'result' && (
            <ItineraryDisplay
              itinerary={itinerary}
              destination={currentDestination}
              onBack={handleBackToForm}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
