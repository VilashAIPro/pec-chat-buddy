
import React from 'react';
import { MentorDetails } from '@/services/mentorService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, BookUser, Users, School } from 'lucide-react';

interface MentorDetailsCardProps {
  mentor: MentorDetails;
}

const MentorDetailsCard: React.FC<MentorDetailsCardProps> = ({ mentor }) => {
  return (
    <Card className="w-full bg-white border border-pec-primary/20 shadow-md animate-bounce-in">
      <CardHeader className="bg-gradient-to-r from-pec-secondary to-pec-primary text-white rounded-t-lg pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <BookUser size={20} /> Mentor Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <BookUser className="text-pec-primary" size={18} />
            <div>
              <span className="text-xs font-medium text-muted-foreground">Name</span>
              <p className="font-semibold">{mentor.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <GraduationCap className="text-pec-primary" size={18} />
            <div>
              <span className="text-xs font-medium text-muted-foreground">Department</span>
              <p className="font-medium">{mentor.department}</p>
            </div>
          </div>
          
          {mentor.section && (
            <div className="flex items-center gap-2">
              <School className="text-pec-primary" size={18} />
              <div>
                <span className="text-xs font-medium text-muted-foreground">Section</span>
                <p className="font-medium">{mentor.section}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <Users className="text-pec-primary" size={18} />
            <div>
              <span className="text-xs font-medium text-muted-foreground">Number of Mentees</span>
              <p className="font-medium">{mentor.students_count}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorDetailsCard;
