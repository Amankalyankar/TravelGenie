import { useState, useRef } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { TravelForm } from '@/components/TravelForm';
import { LoadingState } from '@/components/LoadingState';
import { ItineraryDisplay } from '@/components/ItineraryDisplay';
// Make sure you import useToast if you want to show error messages
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast(); // Initialize the toast hook

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' , block: 'center'});
  };

  const handleFormSubmit = async (formData: TravelFormData) => {
    setState('loading');
    setCurrentDestination(formData.destination);
    
    // START OF CHANGES: Replace the mock API call with a real fetch request
    try {
      const response = await fetch('http://127.0.0.1:5000/api/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Try to get a specific error message from the backend
        const errorData = await response.json().catch(() => ({ error: "An unknown error occurred." }));
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setItinerary(result.itinerary);
      setState('result');

    } catch (error) {
      console.error('Error generating itinerary:', error);
      toast({
        title: "Oh no! Something went wrong.",
        description: (error as Error).message,
        variant: "destructive",
      });
      setState('form'); // Go back to the form on error
    }
    // END OF CHANGES
  };

  const handleBackToForm = () => {
    setState('form');
    setItinerary('');
    setCurrentDestination('');
  };

  return (
    <div className="min-h-screen">
      {state === 'form' && <HeroSection onScrollToForm={scrollToForm} />}
      
      <main className="py-16 px-6">
        <div ref={formRef} className="container mx-auto">
          {state === 'form' && (
            <div className="space-y-12">
              <div className="text-center animate-slide-up">
                <h2 className="text-4xl font-playfair font-bold text-foreground mb-4">
                  Ready to Explore?
                </h2>
              </div>
              {/* CHANGE: Make the isLoading prop dynamic based on the app state */}
              <TravelForm onSubmit={handleFormSubmit} isLoading={state === 'loading'} />
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