
export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
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

  // Check if context matches any of our predefined categories
  for (const [key, suggestions] of Object.entries(contextualSuggestions)) {
    if (context.toLowerCase().includes(key)) {
      return suggestions;
    }
  }

  return defaultSuggestions;
};

// Mock response generator based on user query
export const generateResponse = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const normalizedQuery = query.toLowerCase();
      
      // Simple keyword-based response mapping
      if (normalizedQuery.includes('hello') || normalizedQuery.includes('hi') || normalizedQuery.includes('hey')) {
        resolve('Hello! I\'m PEC Assistant, your guide to Prathyusha Engineering College. How can I help you today?');
      } else if (normalizedQuery.includes('admission') || normalizedQuery.includes('apply')) {
        resolve('For admissions at PEC, you need to complete the online application form, submit required documents, and qualify the entrance criteria. The admission process typically starts in April. Would you like specific details about any part of the admission process?');
      } else if (normalizedQuery.includes('syllabus') || normalizedQuery.includes('course')) {
        resolve('PEC follows the JNTUH syllabus for all engineering programs. Each semester consists of 6-7 courses with theory and practical components. Which department\'s syllabus are you interested in?');
      } else if (normalizedQuery.includes('contact') || normalizedQuery.includes('phone') || normalizedQuery.includes('email')) {
        resolve('You can contact PEC at info@prathyusha.edu.in or call the main office at +91-9876543210. For department-specific contacts, please specify which department you\'re trying to reach.');
      } else if (normalizedQuery.includes('location') || normalizedQuery.includes('address') || normalizedQuery.includes('where')) {
        resolve('Prathyusha Engineering College is located at Poonamallee-Tiruvallur High Road, Tiruvallur District, Tamil Nadu, India. The campus is approximately 20 km from Chennai city center.');
      } else if (normalizedQuery.includes('timing') || normalizedQuery.includes('hours') || normalizedQuery.includes('when')) {
        resolve('PEC campus operates from 8:30 AM to 4:30 PM, Monday through Friday. Administrative offices are open from 9:00 AM to 4:00 PM. The library is accessible from 8:00 AM to 6:00 PM on weekdays.');
      } else if (normalizedQuery.includes('hostel') || normalizedQuery.includes('accommodation')) {
        resolve('PEC offers separate hostel facilities for boys and girls with 24/7 security. Rooms are available on sharing basis (2, 3, or 4 per room). All hostels have Wi-Fi, hot water, and mess facilities.');
      } else if (normalizedQuery.includes('fee') || normalizedQuery.includes('payment') || normalizedQuery.includes('cost')) {
        resolve('The fee structure varies by program. For B.Tech programs, the annual tuition fee ranges from ₹75,000 to ₹1,20,000. Additional fees include examination, development, and hostel charges. Would you like specific fee details for any program?');
      } else if (normalizedQuery.includes('placement') || normalizedQuery.includes('job') || normalizedQuery.includes('career')) {
        resolve('PEC has an excellent placement record with companies like TCS, Infosys, Wipro, CTS, and many more visiting the campus. The average placement rate is 85% with highest package of 12 LPA and average package of 5 LPA.');
      } else if (normalizedQuery.includes('thank')) {
        resolve('You\'re welcome! If you have any more questions about PEC, feel free to ask anytime. I\'m here to help!');
      } else {
        resolve('I\'m not sure I understand. Could you please rephrase your question or select one of the suggested topics below?');
      }
    }, 1500); // 1.5 second delay to simulate API call
  });
};
