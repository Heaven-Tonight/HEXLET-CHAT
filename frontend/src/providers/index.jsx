import { useState } from 'react';
import { AuthContext, ModalContext } from '../contexts/index.jsx';

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(() => {
    const userLoggedIn = JSON.parse(localStorage.getItem('user'));
    return !!userLoggedIn;
  });
  
  const logIn = () => setLoggedIn(true);
  
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{loggedIn, logIn, logOut}}>
      { children }
    </AuthContext.Provider>
  );
};

export const ModalProvider = ({ children }) => {
  const [modalType, setModalType] = useState(null);
  const [isOpen, setModalIsOpen] = useState(false);
  const [currentChannelId, setCurrentChannelId] = useState(null);
  const [isShownToastify, setIsShownToastify] = useState(false);
  
  const showModal = (type, id = null) => {
    setCurrentChannelId(id);
    setModalType(type);
    setModalIsOpen(true);
  }
  const hideModal = () => {
    setCurrentChannelId(null);
    setModalType(null)
    setModalIsOpen(false);
    setIsShownToastify(true);
    setTimeout(() => setIsShownToastify(false), 100000);
  };
  
  return (
    <ModalContext.Provider value={{modalType, isOpen, isShownToastify, currentChannelId, showModal, hideModal}}>
      { children }
    </ModalContext.Provider>
  );
};
