import React, { useEffect, useState } from 'react';

export const MainContext = React.createContext();
function MainContextProvider({ children }) {
  const [userName, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userID, setUserID] = useState('');
  const [hasLogin, setHasLogin] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {

  }, []); // Empty dependency array means this effect runs only once

  return (
    <MainContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        userName,
        setUsername,
        hasLogin,
        setHasLogin,
        userEmail,
        setUserEmail,
        userID,
        setUserID,
        isUserAdmin,
        setIsUserAdmin,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export default MainContextProvider;
