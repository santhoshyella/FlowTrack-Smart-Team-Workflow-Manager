import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "../services/api";

const AuthContext = createContext(null);

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("flowtrack_user"));
  } catch (error) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);
  const [loading, setLoading] = useState(Boolean(localStorage.getItem("flowtrack_token")));

  useEffect(() => {
    const token = localStorage.getItem("flowtrack_token");

    if (!token) {
      setLoading(false);
      return;
    }

    authService
      .me()
      .then(({ data }) => {
        setUser(data.user);
        localStorage.setItem("flowtrack_user", JSON.stringify(data.user));
      })
      .catch(() => {
        localStorage.removeItem("flowtrack_token");
        localStorage.removeItem("flowtrack_user");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const storeSession = (data) => {
    localStorage.setItem("flowtrack_token", data.token);
    localStorage.setItem("flowtrack_user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const login = async (payload) => {
    const { data } = await authService.login(payload);
    storeSession(data);
    return data.user;
  };

  const signup = async (payload) => {
    const { data } = await authService.signup(payload);
    storeSession(data);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("flowtrack_token");
    localStorage.removeItem("flowtrack_user");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      signup,
      logout
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
