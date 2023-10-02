import { useContext, createContext, useState } from "react";

const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AppContext.Provider value={{ user, setUserData: setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
