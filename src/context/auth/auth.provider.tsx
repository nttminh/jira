import { useReducer } from "react";
import { AuthContext } from "./auth.context";
import userAPI from "../services/userAPI";
import { Email } from "@mui/icons-material";
const isBrowser = typeof window !== "undefined";
const INITIAL_STATE = {
  isAuthenticated: isBrowser && !!localStorage.getItem("access_token"),
  token: isBrowser ? localStorage.getItem("access_token") || "" : "",
  user: isBrowser ? JSON.parse(localStorage.getItem("user") || "null") : "",
};

function reducer(
  state: { isAuthenticated: boolean; token: string; user: null },
  action: any
) {
  switch (action.type) {
    case "STORE_TOKEN": {
      localStorage.setItem("access_token", action.payload);

      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
      };
    }
    case "REMOVE_TOKEN": {
      localStorage.removeItem("access_token");
      return {
        ...state,
        token: "",
        isAuthenticated: false,
      };
    }
    case "LOGOUT": {
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      return {
        ...state,
        user: null,
        token: "",
        isAuthenticated: false,
      };
    }
    case "UPDATE_USER": {
      localStorage.setItem("user", JSON.stringify(action.payload));

      return {
        ...state,
        user: { ...action.payload },
      };
    }
    default:
      return state;
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, authDispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
