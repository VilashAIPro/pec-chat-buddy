
import React, { useState } from 'react';
import { MentorDetails } from '@/services/mentorService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookUser, Users, School, ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StudentDetails } from '@/services/firebaseService';

interface MentorDetailsCardProps {
  mentor: MentorDetails;
  students?: StudentDetails[];
}

const MentorDetailsCard: React.FC<MentorDetailsCardProps> = ({ mentor, students }) => {
  const [showStudents, setShowStudents] = useState(false);
  
  const toggleStudents = () => {
    setShowStudents(!showStudents);
  };

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
          
          {students && students.length > 0 && (
            <div className="mt-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleStudents} 
                className="flex items-center gap-1 w-full justify-between"
              >
                <span>View Mentees</span>
                {showStudents ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
              
              {showStudents && (
                <div className="mt-3 max-h-[200px] overflow-y-auto border rounded-md p-2">
                  <ul className="space-y-2">
                    {students.map((student, index) => (
                      <li key={index} className="text-sm border-b last:border-0 pb-1">
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.register_no}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorDetailsCard;
