import React from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white dark:bg-pec-dark">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img 
            src="/lovable-uploads/e8064f8e-0955-4872-b9bd-3aa912915c01.png" 
            alt="PEC Chatbot Logo" 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-bold text-lg">PEC Assistant</h2>
          <div className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Info size={18} className="text-muted-foreground" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>About PEC Assistant</DialogTitle>
                    <DialogDescription>
                      <p className="mb-4">
                        The PEC Chatbot Assistant is your 24/7 guide to Prathyusha Engineering College.
                      </p>
                      <p className="mb-2">You can ask about:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Syllabus details</li>
                        <li>Department contacts</li>
                        <li>Campus navigation</li>
                        <li>College announcements</li>
                        <li>Event schedules</li>
                        <li>Admission information</li>
                      </ul>
                      <p className="mt-4 text-sm text-muted-foreground">Version 1.0</p>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </TooltipTrigger>
            <TooltipContent>
              <p>About PEC Assistant</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ChatHeader;
