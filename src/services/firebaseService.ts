import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

// Firebase configuration - replace with your actual Firebase config when deploying
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export interface StudentDetails {
  register_no: string;
  name: string;
  department: string;
  mentor: string;
}

// Function to fetch student details by name
export const getStudentDetails = async (studentName: string): Promise<StudentDetails | null> => {
  try {
    const studentsRef = collection(db, 'students');
    const q = query(studentsRef, where('name', '==', studentName));
    
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log('No matching student found');
      return null;
    }
    
    // Return the first matching student
    return querySnapshot.docs[0].data() as StudentDetails;
  } catch (error) {
    console.error('Error fetching student details:', error);
    return null;
  }
};

// Function to search student by partial name (for autocomplete/suggestions)
export const searchStudentsByName = async (partialName: string): Promise<StudentDetails[]> => {
  try {
    // In a real implementation, you'd use startAt and endAt with a compound index
    // This simplified version fetches all and filters client-side
    const studentsRef = collection(db, 'students');
    const querySnapshot = await getDocs(studentsRef);
    
    const results: StudentDetails[] = [];
    querySnapshot.forEach((doc) => {
      const student = doc.data() as StudentDetails;
      if (student.name.toLowerCase().includes(partialName.toLowerCase())) {
        results.push(student);
      }
    });
    
    return results;
  } catch (error) {
    console.error('Error searching students:', error);
    return [];
  }
};

// Function to fetch student by register number
export const getStudentByRegisterNo = async (registerNo: string): Promise<StudentDetails | null> => {
  try {
    const studentsRef = collection(db, 'students');
    const q = query(studentsRef, where('register_no', '==', registerNo));
    
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log('No student found with this register number');
      return null;
    }
    
    return querySnapshot.docs[0].data() as StudentDetails;
  } catch (error) {
    console.error('Error fetching student by register number:', error);
    return null;
  }
};
