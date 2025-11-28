import { createContext, useContext, useState, type ReactNode } from 'react';

export type UserRole = 'admin' | 'buyer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  territory?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// todo: remove mock functionality
const mockAdminUser: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@slotcrm.com',
  role: 'admin',
};

const mockBuyerUser: User = {
  id: '2',
  name: 'Rajesh Kumar',
  email: 'rajesh@buyer.com',
  role: 'buyer',
  territory: 'Mumbai, Maharashtra',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(mockAdminUser);

  const login = (email: string, password: string) => {
    console.log('Login triggered:', email, password);
    setUser(mockAdminUser);
  };

  const logout = () => {
    console.log('Logout triggered');
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    console.log('Switch role:', role);
    setUser(role === 'admin' ? mockAdminUser : mockBuyerUser);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
