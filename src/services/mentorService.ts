
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebaseService';

export interface MentorDetails {
  name: string;
  department: string;
  section?: string;
  students_count: number;
}

export interface StudentMentorInfo {
  register_no: string;
  name: string;
  department: string;
  mentor: string;
}

// Function to fetch mentor details by name
export const getMentorByName = async (mentorName: string): Promise<MentorDetails | null> => {
  try {
    const mentorsRef = collection(db, 'mentors');
    const q = query(mentorsRef, where('name', '==', mentorName));
    
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log('No matching mentor found');
      return null;
    }
    
    // Return the first matching mentor
    return querySnapshot.docs[0].data() as MentorDetails;
  } catch (error) {
    console.error('Error fetching mentor details:', error);
    return null;
  }
};

// Function to get mentor by department and section
export const getMentorByDepartment = async (department: string, section?: string): Promise<MentorDetails | null> => {
  try {
    const mentorsRef = collection(db, 'mentors');
    let q;
    
    if (section) {
      q = query(
        mentorsRef, 
        where('department', '==', department),
        where('section', '==', section)
      );
    } else {
      q = query(mentorsRef, where('department', '==', department));
    }
    
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log('No matching mentor found for this department/section');
      return null;
    }
    
    // Return the first matching mentor
    return querySnapshot.docs[0].data() as MentorDetails;
  } catch (error) {
    console.error('Error fetching mentor by department:', error);
    return null;
  }
};

// Function to get student's mentor information
export const getStudentMentorInfo = async (registerNo: string): Promise<StudentMentorInfo | null> => {
  try {
    const studentsRef = collection(db, 'students');
    const q = query(studentsRef, where('register_no', '==', registerNo));
    
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log('No student found with this register number');
      return null;
    }
    
    return querySnapshot.docs[0].data() as StudentMentorInfo;
  } catch (error) {
    console.error('Error fetching student mentor info:', error);
    return null;
  }
};
