/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useState } from 'react';
import CommonAPI from './Utils/CommenAPI';
import AuthAPI from './Utils/AuthAPI';
import { getJWTToken } from './Utils/LocalStorageAccessor';

/**
 * Context provider for managing the main state of the application.
 * @function MainContextProvider
 * @param {Object} props - React component props.
 * @param {React.ReactNode} props.children - Child components to be wrapped by the context provider.
 * @returns {JSX.Element} The rendered React component.
 */
export const MainContext = React.createContext();

function MainContextProvider({ children }) {
  const [userName, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userID, setUserID] = useState('');
  const [hasLogin, setHasLogin] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    if (getJWTToken() !== 'djwt') {
      const payload = {
        token: getJWTToken(),
      };
      AuthAPI.verifyCurrentUser(payload)
        .then(() => {
          CommonAPI.getCurrentUser()
            .then((res) => {
              const {
                email, id, is_admin, name,
              } = res;
              setUsername(name);
              setHasLogin(true);
              setUserEmail(email);
              setUserID(id);
              setIsUserAdmin(is_admin);
              return id;
            });
        });
    }
  }, []); // Empty dependency array means this effect runs only once

  /**
   * Render the context provider with the specified child components.
   * @returns {JSX.Element} The rendered context provider.
   */
  return (
    <MainContext.Provider
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
