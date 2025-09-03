import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { MapPin, Calendar, Heart, Sparkles } from 'lucide-react';

interface TravelFormData {
  destination: string;
  duration: string;
  interests: string;
  plans: string;
}

interface TravelFormProps {
  onSubmit: (data: TravelFormData) => void;
  isLoading: boolean;
}

export const TravelForm = ({ onSubmit, isLoading }: TravelFormProps) => {
  const [formData, setFormData] = useState<TravelFormData>({
    destination: '',
    duration: '',
    interests: '',
    plans: '', // FIX 1: Added missing 'plans' property
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.destination && formData.duration  ) {
      onSubmit(formData);
    }
  };

  const isFormValid = formData.destination && formData.duration  ;

  return (
    <Card className="w-full max-w-2xl mx-auto p-8 card-gradient shadow-lg border-0 animate-slide-up">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-playfair font-semibold text-foreground mb-2">
            Plan Your Perfect Journey
          </h2>
          <p className="text-muted-foreground">
            Tell us about your dream destination and we'll create a personalized itinerary
          </p>
        </div>

        <div className="space-y-6">
          {/* Destination Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              Where would you like to go?
            </label>
            <Input
              placeholder="e.g., Pune , Mumbai , Indore "
              value={formData.destination}
              onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
              className="h-12 text-base border-border/50 focus:border-primary transition-colors"
              disabled={isLoading}
            />
          </div>

          {/* Duration Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Calendar className="w-4 h-4 text-primary" />
              How long is your trip?
            </label>
            <Input
              placeholder="e.g., 5 days, 1 week, 10 days"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              className="h-12 text-base border-border/50 focus:border-primary transition-colors"
              disabled={isLoading}
            />
          </div>

          {/* Interests Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Heart className="w-4 h-4 text-primary" />
              What are your interests?
            </label>
            <Textarea
              placeholder="e.g., museums, food tours, hiking, shopping, nightlife, historical sites..."
              value={formData.interests}
              onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))}
              className="min-h-20 text-base border-border/50 focus:border-primary transition-colors resize-none"
              disabled={isLoading}
            />
          </div>
          
          {/* Plans Input */}
            <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Heart className="w-4 h-4 text-primary" />
              Any plans ? Let us know!
            </label>
            {/* FIX 2: Corrected value and onChange for 'plans' */}
            <Textarea
              placeholder="e.g., 'Have a dinner reservation at 8 PM on Day 2 '"
              value={formData.plans}
              onChange={(e) => setFormData(prev => ({ ...prev, plans: e.target.value }))}
              className="min-h-20 text-base border-border/50 focus:border-primary transition-colors resize-none"
              disabled={isLoading}
            />
            </div>
        </div>
        {/* FIX 3: Removed extra closing </div> tag that was here */}
        <Button
          type="submit"
          variant="hero"
          size="lg"
          disabled={!isFormValid || isLoading}
          className="w-full h-14 text-base font-medium"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full loading-spinner" />
              Creating Your Itinerary...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Generate My Itinerary
            </div>
          )}
        </Button>
      </form>
    </Card>
  );
};