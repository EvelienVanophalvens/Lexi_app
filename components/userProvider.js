import React, { useState } from 'react';
import UserContext from './userContext';

const UserProvider = ({ children }) => {
  const [id, setId] = useState(null);

  return (
    <UserContext.Provider value={{ id, setId }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;