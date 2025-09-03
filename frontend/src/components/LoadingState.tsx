import { Card } from '@/components/ui/card';
import { Plane, MapPin, Compass } from 'lucide-react';

export const LoadingState = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto p-12 card-gradient shadow-lg border-0 animate-fade-in">
      <div className="text-center space-y-6">
        {/* Animated Icons */}
        <div className="flex justify-center items-center space-x-8 mb-8">
          <div className="animate-float" style={{ animationDelay: '0s' }}>
            <Plane className="w-8 h-8 text-primary" />
          </div>
          <div className="animate-float" style={{ animationDelay: '0.5s' }}>
            <MapPin className="w-8 h-8 text-accent" />
          </div>
          <div className="animate-float" style={{ animationDelay: '1s' }}>
            <Compass className="w-8 h-8 text-ocean" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h3 className="text-2xl font-playfair font-semibold text-foreground">
            Crafting Your Perfect Journey
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We're exploring the best destinations, finding hidden gems, and creating a personalized 
            itinerary just for you...
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center">
          <div className="flex space-x-2">
            <div 
              className="w-3 h-3 bg-primary rounded-full animate-pulse"
              style={{ animationDelay: '0s' }}
            ></div>
            <div 
              className="w-3 h-3 bg-primary rounded-full animate-pulse"
              style={{ animationDelay: '0.2s' }}
            ></div>
            <div 
              className="w-3 h-3 bg-primary rounded-full animate-pulse"
              style={{ animationDelay: '0.4s' }}
            ></div>
          </div>
        </div>
      </div>
      
    </Card>
    
  );
};