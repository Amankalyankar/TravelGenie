import { useState, useRef } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { TravelForm } from '@/components/TravelForm';
import { LoadingState } from '@/components/LoadingState';
import { ItineraryDisplay } from '@/components/ItineraryDisplay';
import { useToast } from "@/hooks/use-toast"; // Make sure toast is imported for error handling

type AppState = 'form' | 'loading' | 'result';

// --- THIS MOCK FUNCTION HAS BEEN REMOVED ---

const Index = () => {
  const [appState, setAppState] = useState<AppState>('form');
  const [itinerary, setItinerary] = useState('');
  const [formData, setFormData] = useState({ destination: '', duration: '' });
  const { toast } = useToast(); // Initialize toast hook for error messages

  const formRef = useRef<HTMLDivElement>(null);

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  // --- THIS IS THE CORRECTED FUNCTION ---
  const handleFormSubmit = async (data: { destination: string; duration: string; interests: string; plans: string; }) => {
    setAppState('loading');
    setFormData({ destination: data.destination, duration: data.duration });

    try {
      // Use the real fetch request to your Python backend
      const response = await fetch('https://travelgenie-api.onrender.com/api/generate-itinerary',  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send all form data
      });

      if (!response.ok) {
        // Try to get a specific error message from the backend
        const errorData = await response.json().catch(() => ({ error: "An unknown server error occurred." }));
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setItinerary(result.itinerary);
      setAppState('result');

    } catch (error) {
      console.error('Error generating itinerary:', error);
      toast({
        title: "Oh no! Something went wrong.",
        description: (error as Error).message,
        variant: "destructive",
      });
      setAppState('form'); // Go back to the form on error
    }
  };

  const handleReset = () => {
    setItinerary('');
    setFormData({ destination: '', duration: '' });
    setAppState('form');
  };

  if (appState === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingState />
      </div>
    );
  }

  if (appState === 'result') {
    return (
      <main className="py-12 px-4">
          <ItineraryDisplay
            itinerary={itinerary}
            destination={formData.destination}
            onBack={handleReset}
          />
      </main>
    );
  }

  return (
    <div>
      <HeroSection onScrollToForm={handleScrollToForm} />
      <section ref={formRef} className="py-8 px-4">
        <div className="container mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <h2 className="text-4xl font-playfair font-bold">Ready to Explore?</h2>
              <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                Tell us about your dream destination and let our AI create a<br/>
                personalized itinerary that matches your interests and travel style.
              </p>
            </div>
            {/* The isLoading prop is now dynamic based on appState */}
            <TravelForm onSubmit={handleFormSubmit} isLoading={appState === 'loading'} />
        </div>
      </section>
    </div>
  );
};

export default Index;