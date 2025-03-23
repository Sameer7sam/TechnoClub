
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user types
type User = {
  id: string;
  name: string;
  email: string;
  studentId: string;
  role: 'member' | 'club_head' | 'admin';
  club: string;
  chapter: string;
  totalCredits: number;
  joinDate: string;
  // Additional fields for new registration form
  phoneNumber?: string;
  city?: string;
  state?: string;
  college?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: 'member' | 'club_head') => Promise<void>;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'totalCredits' | 'joinDate'> & { password: string }) => Promise<void>;
  giveCredits: (recipientId: string, amount: number, reason: string) => Promise<void>;
  createEvent: (eventData: EventData) => Promise<void>;
  addMemberToEvent: (eventId: string, memberId: string) => Promise<void>;
  isClubHead: () => boolean;
};

// Define event types
type EventData = {
  name: string;
  description: string;
  date: string;
  credits: number;
  location: string;
};

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    password: 'password123',
    studentId: 'A12345678',
    role: 'member' as const,
    club: 'IEEE',
    chapter: 'Computer Society',
    totalCredits: 450,
    joinDate: '2023-08-15',
    phoneNumber: '1234567890',
    city: 'San Francisco',
    state: 'California',
    college: 'Stanford University',
  },
  {
    id: '2',
    name: 'Samantha Lee',
    email: 'sam@example.com',
    password: 'password123',
    studentId: 'B87654321',
    role: 'club_head' as const,
    club: 'ACM',
    chapter: 'SIGAI',
    totalCredits: 720,
    joinDate: '2023-06-10',
    phoneNumber: '0987654321',
    city: 'Boston',
    state: 'Massachusetts',
    college: 'MIT',
  }
];

// Mock events data
const MOCK_EVENTS: Record<string, any> = {};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Mock login implementation with role selection
  const login = async (email: string, password: string, role: 'member' | 'club_head') => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = MOCK_USERS.find(
      user => user.email === email && user.password === password && user.role === role
    );
    
    if (!foundUser) {
      throw new Error('Invalid credentials or role');
    }
    
    // Remove password before storing user
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
  };

  // Mock registration implementation with role selection
  const register = async (userData: Omit<User, 'id' | 'totalCredits' | 'joinDate'> & { password: string }) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, this would create a new user in the database
    const newUser = {
      ...userData,
      id: Math.random().toString(36).substring(2, 9),
      totalCredits: 0,
      joinDate: new Date().toISOString().split('T')[0],
    };
    
    // Remove password before storing user
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Function to check if the current user is a club head
  const isClubHead = () => {
    return user?.role === 'club_head';
  };

  // Club head only functions
  const giveCredits = async (recipientId: string, amount: number, reason: string) => {
    if (!isClubHead()) {
      throw new Error('Only club heads can give credits');
    }
    
    // In a real app, this would update the database
    // For this mock implementation, we'll log the action
    console.log(`Credits given: ${amount} to user ${recipientId} for ${reason}`);
    return Promise.resolve();
  };

  const createEvent = async (eventData: EventData) => {
    if (!isClubHead()) {
      throw new Error('Only club heads can create events');
    }
    
    // In a real app, this would add to the database
    const eventId = Math.random().toString(36).substring(2, 9);
    MOCK_EVENTS[eventId] = {
      ...eventData,
      id: eventId,
      createdBy: user?.id,
      members: []
    };
    
    console.log('Event created:', MOCK_EVENTS[eventId]);
    return Promise.resolve();
  };

  const addMemberToEvent = async (eventId: string, memberId: string) => {
    if (!isClubHead()) {
      throw new Error('Only club heads can add members to events');
    }
    
    if (!MOCK_EVENTS[eventId]) {
      throw new Error('Event not found');
    }
    
    // Add member to event
    MOCK_EVENTS[eventId].members.push(memberId);
    console.log(`Member ${memberId} added to event ${eventId}`);
    return Promise.resolve();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      logout, 
      register, 
      giveCredits, 
      createEvent, 
      addMemberToEvent, 
      isClubHead 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
