import { useQueryClient } from "@tanstack/react-query";
import { createContext, useState, type ReactNode } from "react";
import toast from "react-hot-toast";

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const queryClient = useQueryClient();
  const [token, setTokenState] = useState<string | null>(
    localStorage.getItem("token"),
  );

  function setToken(token: string | null) {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    setTokenState(token);
  }

  function logout() {
    setToken(null);
    queryClient.invalidateQueries({
      queryKey: ["articles"],
    });
    toast.success("Logged out");
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
