
import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import QuickReplies from './QuickReplies';
import ChatInput from './ChatInput';
import { Message as MessageType } from '../services/chatService';
import { generateResponse, getSuggestions } from '../services/chatService';
import { StudentDetails } from '../services/firebaseService';
import { toast } from '@/hooks/use-toast';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      text: 'Hi there! I\'m the PEC Assistant. I can help you with information about Prathyusha Engineering College. What would you like to know?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(getSuggestions());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    
    try {
      // Generate response
      const response = await generateResponse(text);
      
      // Add bot response after a short delay
      setTimeout(() => {
        const botMessage: MessageType = {
          id: (Date.now() + 1).toString(),
          text: response.text,
          isUser: false,
          timestamp: new Date(),
          studentDetails: response.studentDetails
        };
        
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
        
        // If student details were requested but not found, show toast
        if (text.toLowerCase().includes('student') && !response.studentDetails) {
          toast({
            title: "Student Search",
            description: "Could not find the requested student information",
            variant: "destructive",
          });
        }
        
        // Update suggestions based on context
        setSuggestions(getSuggestions(text + ' ' + response.text));
      }, 500);
    } catch (error) {
      console.error('Error generating response:', error);
      setIsTyping(false);
      
      toast({
        title: "Error",
        description: "There was a problem connecting to the service",
        variant: "destructive",
      });
    }
  };

  const handleQuickReplySelect = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="flex flex-col h-full md:h-[600px] max-w-2xl w-full mx-auto border rounded-lg overflow-hidden shadow-lg bg-gray-50 dark:bg-pec-dark/70">
      <ChatHeader />
      
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <Message
            key={message.id}
            text={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
            studentDetails={message.studentDetails}
          />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
      
      {!isTyping && suggestions.length > 0 && (
        <div className="px-4">
          <QuickReplies 
            suggestions={suggestions} 
            onSelect={handleQuickReplySelect} 
          />
        </div>
      )}
      
      <ChatInput 
        onSendMessage={handleSendMessage}
        disabled={isTyping}
      />
    </div>
  );
};

export default ChatInterface;
