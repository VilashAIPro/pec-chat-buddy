
import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex mb-4">
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pec-primary to-pec-secondary flex-shrink-0 mr-2 flex items-center justify-center">
        <span className="text-white font-bold text-xs">P</span>
      </div>
      
      <div className="bot-message flex items-center">
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
