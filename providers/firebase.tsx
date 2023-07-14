import React from 'react';
import FirebaseService from '../services/firebase/firebaseService';
import FirebaseServiceInterface  from '../services/firebase/firebaseServiceInterface';

const FirebaseContext = React.createContext<FirebaseServiceInterface | null>(null);

export const FirebaseProvider: React.FC = ({ children }) => {
  return (
    <FirebaseContext.Provider value={FirebaseService}>
      {children}
    </FirebaseContext.Provider>
  )
};

export const useFirebase = (): FirebaseServiceInterface => {
  const firebaseService = React.useContext(FirebaseContext);
  if (!firebaseService) {
    throw new Error('FirebaseService is not provided');
  }
  return firebaseService;
};