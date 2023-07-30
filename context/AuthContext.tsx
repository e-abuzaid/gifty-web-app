import { User } from "@/types/types";
import { createContext, useContext, useState } from "react";

type authContextType = {
  user: User | null;
  token: string;
  login: (user: User, token: string) => void;
  logout: () => void;
};

const authContextDefaultValues: authContextType = {
  user: null,
  token: "",
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const currentUser = localStorage.getItem("user")
    ? localStorage.getItem("user")
    : null;
  let currentParsedUser = undefined;
  if (currentUser) currentParsedUser = JSON.parse(currentUser);
  const [user, setUser] = useState<User | null>(
    currentParsedUser ? currentParsedUser : null
  );
  const [token, setToken] = useState<string>("");
  const login = (user: User, token: string) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setToken("");
  };

  const value = {
    user,
    login,
    logout,
    token,
  };
  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
