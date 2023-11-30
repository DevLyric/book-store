import { ReactNode, createContext, useContext, useState } from "react";

interface AuthContextProps {
  user: User | null;
  login: (userData: User) => void;
  logOut: () => void;
}

interface User {
  id: string;
  username: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => setUser(userData);
  const logOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um provider");
  }

  return context;
};
