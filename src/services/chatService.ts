
import { getStudentDetails, StudentDetails } from './firebaseService';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  studentDetails?: StudentDetails | null;
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
    ]
  };

  const studentRelatedContexts = ['student', 'details', 'info', 'find', 'search'];
  
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

// Mock response generator based on user query
export const generateResponse = async (query: string): Promise<{ text: string; studentDetails?: StudentDetails | null }> => {
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
        text: "I'm having trouble retrieving student information at the moment. Please try again later.",
        studentDetails: null
      };
    }
  }
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const normalizedQuery = query.toLowerCase();
      
      if (normalizedQuery.includes('hello') || normalizedQuery.includes('hi') || normalizedQuery.includes('hey')) {
        resolve({ text: 'Hello! I\'m PEC Assistant, your guide to Prathyusha Engineering College. How can I help you today?' });
      } else if (normalizedQuery.includes('student') || normalizedQuery.includes('details') || normalizedQuery.includes('information')) {
        resolve({ text: 'I can help you find information about students. Try asking "Show details for KAKU VILASH KUMAR REDDY" or search for any other student by name.' });
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
