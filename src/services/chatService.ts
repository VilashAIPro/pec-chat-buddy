import { getStudentDetails, StudentDetails, getStudentByRegisterNo } from './firebaseService';
import { getMentorByName, getMentorByDepartment, MentorDetails, getStudentsByMentor } from './mentorService';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  studentDetails?: StudentDetails | null;
  mentorDetails?: MentorDetails | null;
  students?: StudentDetails[];
}

// Sample quick reply suggestions based on context
export const getSuggestions = (context: string = ''): string[] => {
  const defaultSuggestions = [
    'College timings',
    'Department contacts',
    'Course syllabus',
    'Campus map',
    'Upcoming events',
    'Admission process'
  ];

  const contextualSuggestions: Record<string, string[]> = {
    'admission': [
      'Admission requirements',
      'Application deadlines',
      'Fee structure',
      'Scholarships available',
      'Entrance exams',
      'Contact admission office'
    ],
    'syllabus': [
      'CSE syllabus',
      'ECE syllabus',
      'Mechanical syllabus',
      'Civil syllabus',
      'Examination pattern',
      'Credit system'
    ],
    'campus': [
      'Hostel facilities',
      'Canteen menu',
      'Library hours',
      'Sports facilities',
      'Transport services',
      'WiFi access'
    ],
    'department': [
      'CSE department',
      'ECE department',
      'Mechanical department',
      'Civil department',
      'Faculty details',
      'Lab facilities'
    ],
    'events': [
      'Annual fest dates',
      'Technical symposiums',
      'Cultural activities',
      'Workshop schedule',
      'Industry visits',
      'Placement drives'
    ],
    'mentor': [
      'Find my mentor',
      'Who is Dr. KAVIMANI?',
      'CSE A mentor',
      'AI&DS department mentors',
      'Students under P.UMA',
      'Number of mentees for Dr. KAVIMANI'
    ]
  };

  const studentRelatedContexts = ['student', 'details', 'info', 'find', 'search'];
  const mentorRelatedContexts = ['mentor', 'faculty', 'teacher', 'guide', 'department'];
  
  if (mentorRelatedContexts.some(keyword => context.toLowerCase().includes(keyword))) {
    return [
      'Who is the mentor for CSE A?',
      'Show details for Dr. KAVIMANI',
      'Who is Mrs. P.UMA?',
      'Find mentors in AI&DS department',
      'How many students under Mrs. METILDA?',
      'Show all mentors'
    ];
  }
  
  if (studentRelatedContexts.some(keyword => context.toLowerCase().includes(keyword))) {
    return [
      'Find student KAKU VILASH KUMAR REDDY',
      'Show details for KAKU VILASH KUMAR REDDY',
      'Who is KAKU VILASH KUMAR REDDY?',
      'Department contacts',
      'Admission process',
      'Course syllabus'
    ];
  }

  // Check if context matches any of our predefined categories
  for (const [key, suggestions] of Object.entries(contextualSuggestions)) {
    if (context.toLowerCase().includes(key)) {
      return suggestions;
    }
  }

  return defaultSuggestions;
};

// Check if a query is requesting student information
const isStudentQuery = (query: string): string | null => {
  const patterns = [
    /find student (.*)/i,
    /show details for (.*)/i,
    /who is (.*)/i,
    /tell me about (.*)/i,
    /information about (.*)/i,
    /details of (.*)/i,
  ];
  
  for (const pattern of patterns) {
    const match = query.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  const studentQueryKeywords = ['details', 'student', 'information'];
  if (studentQueryKeywords.some(keyword => query.toLowerCase().includes(keyword))) {
    const words = query.split(' ');
    const potentialNames = words.filter(word => 
      word.length > 1 && word[0] === word[0].toUpperCase()
    );
    
    if (potentialNames.length >= 2) {
      return potentialNames.join(' ');
    }
  }
  
  return null;
};

// Check if a query is requesting mentor information
const isMentorQuery = (query: string): string | null => {
  const patterns = [
    /find mentor (.*)/i,
    /show details for (.*)/i,
    /who is (.*)/i,
    /tell me about (.*)/i,
    /information about (.*)/i,
    /details of (.*)/i,
    /mentor for (.*)/i,
    /who mentors (.*)/i,
    /teacher for (.*)/i,
  ];
  
  for (const pattern of patterns) {
    const match = query.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  const mentorQueryKeywords = ['mentor', 'faculty', 'teacher', 'guide', 'advisor'];
  if (mentorQueryKeywords.some(keyword => query.toLowerCase().includes(keyword))) {
    const words = query.split(' ');
    const potentialNames = words.filter(word => 
      word.length > 1 && word[0] === word[0].toUpperCase()
    );
    
    if (potentialNames.length >= 2) {
      return potentialNames.join(' ');
    }
  }
  
  return null;
};

// Check if a query is requesting students by mentor
const isStudentsByMentorQuery = (query: string): string | null => {
  const patterns = [
    /students (under|of|for) (.*)/i,
    /who are (.*)'s students/i,
    /list students (under|of|for) (.*)/i,
    /show me students (under|of|for) (.*)/i,
    /mentees (under|of|for) (.*)/i,
    /who are (.*)'s mentees/i,
    /list mentees (under|of|for) (.*)/i,
    /show me mentees (under|of|for) (.*)/i,
  ];
  
  for (const pattern of patterns) {
    const match = query.match(pattern);
    if (match && match[2]) {
      return match[2].trim();
    }
  }
  
  return null;
};

// Extract department and section from query
const extractDepartmentSection = (query: string): { department: string; section?: string } | null => {
  const deptPattern = /(CSE|ECE|MECH|CIVIL|AI&DS|ME|EEE)\s*([A-C])?/i;
  const match = query.match(deptPattern);
  
  if (match) {
    return {
      department: match[1].toUpperCase(),
      section: match[2] ? match[2].toUpperCase() : undefined
    };
  }
  
  const fullDeptMap: Record<string, string> = {
    'computer science': 'CSE',
    'electronics': 'ECE',
    'mechanical': 'MECH',
    'civil': 'CIVIL',
    'artificial intelligence': 'AI&DS',
    'data science': 'AI&DS',
    'electrical': 'EEE'
  };
  
  for (const [key, value] of Object.entries(fullDeptMap)) {
    if (query.toLowerCase().includes(key)) {
      const sectionMatch = query.match(/section\s*([A-C])/i);
      return {
        department: value,
        section: sectionMatch ? sectionMatch[1].toUpperCase() : undefined
      };
    }
  }
  
  return null;
};

// Check for register number in query
const extractRegisterNumber = (query: string): string | null => {
  const regMatch = query.match(/(\d{8}[A-Z]{2}\d{5})/i);
  return regMatch ? regMatch[1] : null;
};

// Mock response generator based on user query
export const generateResponse = async (query: string): Promise<{ 
  text: string; 
  studentDetails?: StudentDetails | null;
  mentorDetails?: MentorDetails | null;
  students?: StudentDetails[];
}> => {
  const registerNo = extractRegisterNumber(query);
  if (registerNo) {
    try {
      const studentDetails = await getStudentByRegisterNo(registerNo);
      if (studentDetails) {
        return {
          text: `Here are the details for register number ${registerNo}:`,
          studentDetails
        };
      } else {
        return {
          text: `I couldn't find a student with register number "${registerNo}". Please check and try again.`
        };
      }
    } catch (error) {
      console.error('Error fetching student by register number:', error);
      return {
        text: "I'm having trouble retrieving student information. Please try again later."
      };
    }
  }

  // Check for students by mentor query
  const mentorForStudents = isStudentsByMentorQuery(query);
  if (mentorForStudents) {
    try {
      const mentorDetails = await getMentorByName(mentorForStudents);
      
      if (mentorDetails) {
        const students = await getStudentsByMentor(mentorDetails.name);
        
        if (students && students.length > 0) {
          return {
            text: `I found ${students.length} students under mentor ${mentorDetails.name}:`,
            mentorDetails,
            students
          };
        } else {
          return {
            text: `${mentorDetails.name} is a mentor, but I couldn't find any students assigned to them in the database.`,
            mentorDetails
          };
        }
      } else {
        return {
          text: `I couldn't find a mentor named "${mentorForStudents}". Please check the spelling or try another name.`
        };
      }
    } catch (error) {
      console.error('Error fetching students by mentor:', error);
      return {
        text: "I'm having trouble retrieving the student list. Please try again later."
      };
    }
  }

  const mentorName = isMentorQuery(query);
  if (mentorName) {
    try {
      const deptInfo = extractDepartmentSection(query);
      
      if (deptInfo) {
        const mentorDetails = await getMentorByDepartment(deptInfo.department, deptInfo.section);
        if (mentorDetails) {
          const students = await getStudentsByMentor(mentorDetails.name);
          
          return {
            text: `The mentor for ${deptInfo.department}${deptInfo.section ? ' ' + deptInfo.section : ''} is:`,
            mentorDetails,
            students: students && students.length > 0 ? students : undefined
          };
        } else {
          return {
            text: `I couldn't find mentor information for ${deptInfo.department}${deptInfo.section ? ' ' + deptInfo.section : ''}. Please check the department code and try again.`
          };
        }
      }
      
      const mentorDetails = await getMentorByName(mentorName);
      
      if (mentorDetails) {
        const students = await getStudentsByMentor(mentorDetails.name);
        
        return {
          text: `Here are the details for mentor ${mentorDetails.name}:`,
          mentorDetails,
          students: students && students.length > 0 ? students : undefined
        };
      } else {
        return {
          text: `I couldn't find a mentor named "${mentorName}". Please check the spelling or try another name.`,
          mentorDetails: null
        };
      }
    } catch (error) {
      console.error('Error fetching mentor details:', error);
      return {
        text: "I'm having trouble retrieving mentor information. Please try again later."
      };
    }
  }
  
  const studentName = isStudentQuery(query);
  if (studentName) {
    try {
      const studentDetails = await getStudentDetails(studentName);
      
      if (studentDetails) {
        return {
          text: `Here are the details for ${studentDetails.name}:`,
          studentDetails
        };
      } else {
        return {
          text: `I couldn't find any student with the name "${studentName}". Please check the spelling or try another name.`,
          studentDetails: null
        };
      }
    } catch (error) {
      console.error('Error fetching student details:', error);
      return {
        text: "I'm having trouble retrieving student information at the moment. Please try again later."
      };
    }
  }
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const normalizedQuery = query.toLowerCase();
      
      if (normalizedQuery.includes('mentor') || normalizedQuery.includes('faculty')) {
        resolve({ 
          text: 'I can help you find information about mentors at PEC. You can ask about a specific mentor by name (e.g., "Who is Dr. KAVIMANI?"), or ask about mentors for a specific department (e.g., "Who is the mentor for CSE A?"), or even see student lists (e.g., "Show me students under Dr. KAVIMANI").'
        });
      } else if (normalizedQuery.includes('hello') || normalizedQuery.includes('hi') || normalizedQuery.includes('hey')) {
        resolve({ text: 'Hello! I\'m PEC Assistant, your guide to Prathyusha Engineering College. How can I help you today?' });
      } else if (normalizedQuery.includes('student') || normalizedQuery.includes('details') || normalizedQuery.includes('information')) {
        resolve({ text: 'I can help you find information about students and their mentors. Try asking "Show details for KAKU VILASH KUMAR REDDY" or "Find mentor for CSE A" or "Show me students under Dr. KAVIMANI" to get started.' });
      } else if (normalizedQuery.includes('admission') || normalizedQuery.includes('apply')) {
        resolve({ text: 'For admissions at PEC, you need to complete the online application form, submit required documents, and qualify the entrance criteria. The admission process typically starts in April. Would you like specific details about any part of the admission process?' });
      } else if (normalizedQuery.includes('syllabus') || normalizedQuery.includes('course')) {
        resolve({ text: 'PEC follows the JNTUH syllabus for all engineering programs. Each semester consists of 6-7 courses with theory and practical components. Which department\'s syllabus are you interested in?' });
      } else if (normalizedQuery.includes('contact') || normalizedQuery.includes('phone') || normalizedQuery.includes('email')) {
        resolve({ text: 'You can contact PEC at info@prathyusha.edu.in or call the main office at +91-9876543210. For department-specific contacts, please specify which department you\'re trying to reach.' });
      } else if (normalizedQuery.includes('location') || normalizedQuery.includes('address') || normalizedQuery.includes('where')) {
        resolve({ text: 'Prathyusha Engineering College is located at Poonamallee-Tiruvallur High Road, Tiruvallur District, Tamil Nadu, India. The campus is approximately 20 km from Chennai city center.' });
      } else if (normalizedQuery.includes('timing') || normalizedQuery.includes('hours') || normalizedQuery.includes('when')) {
        resolve({ text: 'PEC campus operates from 8:30 AM to 4:30 PM, Monday through Friday. Administrative offices are open from 9:00 AM to 4:00 PM. The library is accessible from 8:00 AM to 6:00 PM on weekdays.' });
      } else if (normalizedQuery.includes('hostel') || normalizedQuery.includes('accommodation')) {
        resolve({ text: 'PEC offers separate hostel facilities for boys and girls with 24/7 security. Rooms are available on sharing basis (2, 3, or 4 per room). All hostels have Wi-Fi, hot water, and mess facilities.' });
      } else if (normalizedQuery.includes('fee') || normalizedQuery.includes('payment') || normalizedQuery.includes('cost')) {
        resolve({ text: 'The fee structure varies by program. For B.Tech programs, the annual tuition fee ranges from ₹75,000 to ₹1,20,000. Additional fees include examination, development, and hostel charges. Would you like specific fee details for any program?' });
      } else if (normalizedQuery.includes('placement') || normalizedQuery.includes('job') || normalizedQuery.includes('career')) {
        resolve({ text: 'PEC has an excellent placement record with companies like TCS, Infosys, Wipro, CTS, and many more visiting the campus. The average placement rate is 85% with highest package of 12 LPA and average package of 5 LPA.' });
      } else if (normalizedQuery.includes('thank')) {
        resolve({ text: 'You\'re welcome! If you have any more questions about PEC, feel free to ask anytime. I\'m here to help!' });
      } else {
        resolve({ text: 'I\'m not sure I understand. Could you please rephrase your question or select one of the suggested topics below?' });
      }
    }, 1500);
  });
};
