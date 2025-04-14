
import React from 'react';
import { StudentDetails } from '@/services/firebaseService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Book, User, UserCircle } from 'lucide-react';

interface StudentDetailsCardProps {
  student: StudentDetails;
}

const StudentDetailsCard: React.FC<StudentDetailsCardProps> = ({ student }) => {
  return (
    <Card className="w-full bg-white border border-pec-primary/20 shadow-md animate-bounce-in">
      <CardHeader className="bg-gradient-to-r from-pec-primary to-pec-secondary text-white rounded-t-lg pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <UserCircle size={20} /> Student Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="text-pec-primary" size={18} />
            <div>
              <span className="text-xs font-medium text-muted-foreground">Name</span>
              <p className="font-semibold">{student.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Book className="text-pec-primary" size={18} />
            <div>
              <span className="text-xs font-medium text-muted-foreground">Register Number</span>
              <p className="font-medium">{student.register_no}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <GraduationCap className="text-pec-primary" size={18} />
            <div>
              <span className="text-xs font-medium text-muted-foreground">Department</span>
              <p className="font-medium">{student.department}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <User className="text-pec-primary" size={18} />
            <div>
              <span className="text-xs font-medium text-muted-foreground">Mentor</span>
              <p className="font-medium">{student.mentor}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentDetailsCard;
