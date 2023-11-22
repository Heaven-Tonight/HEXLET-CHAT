import {createContext} from "react";

const AuthContext = createContext({
  isAuthed: false,
  setAuth: () => {},
});

export default AuthContext;
