import { createContext, Dispatch, useContext } from 'react';
import { SignInContent } from '../../interface/userAuthentication';
const isBrowser = typeof window !== 'undefined';

export type authContextType = {
	authState: {
		isAuthenticated: boolean;
		token: string;
		user: SignInContent | null;
	};
	authDispatch: Dispatch<any>;

};

const authContextDefaultValues: authContextType = {
  authState: {
    isAuthenticated: isBrowser && !!localStorage.getItem("access_token"),
    token: isBrowser ? localStorage.getItem("access_token") || "" : "",
    user: isBrowser ? JSON.parse(localStorage.getItem("user") || "null") : "",
  },
  authDispatch: () => {},
};

export const AuthContext = createContext(authContextDefaultValues);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
