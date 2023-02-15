import { createContext, useState } from "react";

export const AuthLoading = createContext([false, () => {}]); 

export default function AuthContext({children}) {
    const [authLoading, setAuthLoading] = useState(false);
  return (
    <AuthLoading.Provider value={{ authLoading, setAuthLoading }}>
      {children}
    </AuthLoading.Provider>
  )
}
