import React, { useEffect, useState } from 'react';

export const MainContext = React.createContext();
function MainContextProvider({ children }) {
  const [userName, setUsername] = useState('');
  const value = React.useMemo(() => [userName, setUsername], [userName]);
  return (
    <MainContext.Provider
      value={value}
    >
      {children}
    </MainContext.Provider>
  );
}

export default MainContextProvider;
