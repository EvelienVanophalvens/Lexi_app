//een component maken waardoor id gekend woord door alle component die omringd zijn met UserContext

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