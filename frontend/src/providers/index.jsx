import { useState } from 'react';
import { AuthContext, ModalContext, ScrollContext } from '../contexts/index.jsx';

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(() => {
    const userLoggedIn = localStorage.getItem('user');
    return !!userLoggedIn;
  });

  const logIn = () => setLoggedIn(true);

  const logOut = () => {
    // eslint-disable-next-line
    localStorage.removeItem('user');
    // eslint-disable-next-line
    setLoggedIn(false);
  };

  return (
    // eslint-disable-next-line
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
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
    // eslint-disable-next-line
    setCurrentChannelId(id);
    // eslint-disable-next-line
    setModalType(type);
    // eslint-disable-next-line
    setModalIsOpen(true);
  };
  const hideModal = () => {
    // eslint-disable-next-line
    setCurrentChannelId(null);
    // eslint-disable-next-line
    setModalType(null)
    // eslint-disable-next-line
    setModalIsOpen(false);
    // eslint-disable-next-line
    setIsShownToastify(true);
    // eslint-disable-next-line
    setTimeout(() => setIsShownToastify(false), 100000);
  };

  return (
    <ModalContext.Provider
      value={
        // eslint-disable-next-line
        {
          modalType,
          isOpen,
          isShownToastify,
          currentChannelId,
          showModal,
          hideModal,
        }
    }
    >
      { children }
    </ModalContext.Provider>
  );
};

export const ScrollProvider = ({ children }) => {
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);

  const scrollToBottom = () => {
    // eslint-disable-next-line
    setShouldScrollToBottom(true);
  };

  const cancelScrollToBottom = () => {
    // eslint-disable-next-line
    setShouldScrollToBottom(false);
  };

  return (
    // eslint-disable-next-line
    <ScrollContext.Provider value={{ shouldScrollToBottom, scrollToBottom, cancelScrollToBottom }}>
      { children }
    </ScrollContext.Provider>
  );
};
