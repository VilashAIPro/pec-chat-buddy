
import React, { useState } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import ChatInterface from '@/components/ChatInterface';

const Index = () => {
  const [chatStarted, setChatStarted] = useState(false);

  const startChat = () => {
    setChatStarted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 dark:from-pec-dark dark:to-black p-4">
      <div className="w-full max-w-4xl">
        {!chatStarted ? (
          <WelcomeScreen onStart={startChat} />
        ) : (
          <ChatInterface />
        )}
      </div>
      
      <footer className="mt-8 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Prathyusha Engineering College. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
