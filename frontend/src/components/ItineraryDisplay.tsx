import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, Check, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ItineraryDisplayProps {
  itinerary: string;
  destination: string;
  onBack: () => void;
}

export const ItineraryDisplay = ({ itinerary, destination, onBack }: ItineraryDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(itinerary);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Your itinerary has been copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard. Please select and copy manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Plan Another Trip
        </Button>
        
        <Button
          variant="outline"
          onClick={handleCopy}
          className="flex items-center gap-2"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy Itinerary'}
        </Button>
      </div>

      {/* Itinerary Content */}
      <Card className="p-8 card-gradient shadow-lg border-0">
        <div className="mb-6">
          <h2 className="text-4xl font-playfair font-semibold text-foreground mb-2">
            Your {destination} Adventure
          </h2>
          <p className="text-muted-foreground">
            A personalized itinerary crafted just for you
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div 
            className="whitespace-pre-wrap text-foreground leading-relaxed"
            style={{ 
              fontFamily: 'Inter, system-ui, sans-serif',
              lineHeight: '1.7'
            }}
          >
            {itinerary}
          </div>
        </div>
      </Card>

      {/* Footer Actions */}
      <div className="flex justify-center mt-8">
        <Button
          variant="hero"
          onClick={onBack}
          className="px-8 py-3"
        >
          Create Another Itinerary
        </Button>
      </div>
    
  </div>
  );
};