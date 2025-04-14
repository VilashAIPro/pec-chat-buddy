
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export interface MessageProps {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Message: React.FC<MessageProps> = ({ text, isUser, timestamp }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-up`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pec-primary to-pec-secondary flex-shrink-0 mr-2 flex items-center justify-center">
          <span className="text-white font-bold text-xs">P</span>
        </div>
      )}
      
      <div className={isUser ? 'user-message animate-bounce-in' : 'bot-message animate-bounce-in'}>
        <p className="text-sm">{text}</p>
        <div className={`text-xs mt-1 ${isUser ? 'text-pec-light' : 'text-muted-foreground'}`}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pec-secondary to-pec-primary flex-shrink-0 ml-2 flex items-center justify-center">
          <span className="text-white font-bold text-xs">U</span>
        </div>
      )}
    </div>
  );
};

export default Message;
