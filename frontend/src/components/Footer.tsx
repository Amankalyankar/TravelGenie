import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full bg-background py-6 text-center text-base text-muted-foreground border-t border-border/50">
      <div className="container mx-auto px-4">
        <p>© {new Date().getFullYear()} Aman Kalyankar. My code stands above the rest.</p>
      </div>
    </footer>
  );
};