
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-[600px] w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-r from-pec-primary to-pec-secondary flex items-center justify-center">
        <span className="text-white font-bold text-3xl">PEC</span>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pec-primary to-pec-secondary text-transparent bg-clip-text">
        PEC Chatbot Assistant
      </h1>
      
      <p className="text-muted-foreground mb-8 max-w-md">
        Your 24/7 interactive guide to Prathyusha Engineering College. Get instant answers about syllabus, departments, campus navigation, and more.
      </p>
      
      <div className="space-y-4 w-full max-w-xs">
        <Button 
          onClick={onStart}
          className="w-full h-12 bg-gradient-to-r from-pec-primary to-pec-secondary hover:opacity-90 transition-opacity"
        >
          <MessageSquare className="mr-2" size={18} />
          Start Chatting
        </Button>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-white dark:bg-pec-dark/50 shadow-sm flex flex-col items-center">
            <div className="text-2xl font-bold text-pec-primary">24/7</div>
            <div className="text-xs text-muted-foreground">Availability</div>
          </div>
          
          <div className="p-4 rounded-lg border bg-white dark:bg-pec-dark/50 shadow-sm flex flex-col items-center">
            <div className="text-2xl font-bold text-pec-secondary">100+</div>
            <div className="text-xs text-muted-foreground">Topics</div>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground mt-8">
        Designed for students, staff, and visitors of Prathyusha Engineering College
      </p>
    </div>
  );
};

export default WelcomeScreen;
