import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

const UserContext = React.createContext([null, () => {}]);

const UserProvider = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const token = localStorage.getItem('token');
  let obj = {};
  if (userInfo && token) {
    obj = {
      ...userInfo,
      token,
    };
  }
  const [user, setUser] = useState(obj);
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
};

export { UserContext, UserProvider };
