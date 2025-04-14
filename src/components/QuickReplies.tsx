
import React from 'react';

interface QuickRepliesProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

const QuickReplies: React.FC<QuickRepliesProps> = ({ suggestions, onSelect }) => {
  return (
    <div className="flex gap-2 overflow-x-auto py-3 px-2 -mx-2 mb-3 animate-fade-in">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion)}
          className="quick-reply-button"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};

export default QuickReplies;
