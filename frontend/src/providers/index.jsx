import { useState, useMemo, useCallback } from 'react';
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

  const contextValue = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return (
    <AuthContext.Provider value={contextValue}>
      { children }
    </AuthContext.Provider>
  );
};

export const ModalProvider = ({ children }) => {
  const [modalType, setModalType] = useState(null);
  const [isOpen, setModalIsOpen] = useState(false);
  const [currentChannelId, setCurrentChannelId] = useState(null);
  const [isShownToastify, setIsShownToastify] = useState(false);

  const showModal = useCallback((type, id = null) => {
    // eslint-disable-next-line
    setCurrentChannelId(id);
    // eslint-disable-next-line
    setModalType(type);
    // eslint-disable-next-line
    setModalIsOpen(true);
  }, []);

  const hideModal = useCallback(() => {
    // eslint-disable-next-line
    setCurrentChannelId(null);
    // eslint-disable-next-line
    setModalType(null);
    // eslint-disable-next-line
    setModalIsOpen(false);
    // eslint-disable-next-line
    setIsShownToastify(true);
    // eslint-disable-next-line
    setTimeout(() => setIsShownToastify(false), 100000);
  }, []);

  const contextValue = useMemo(() => ({
    modalType,
    isOpen,
    isShownToastify,
    currentChannelId,
    showModal,
    hideModal,
  }), [modalType, isOpen, isShownToastify, currentChannelId, showModal, hideModal]);

  return (
    <ModalContext.Provider
      value={contextValue}
    >
      { children }
    </ModalContext.Provider>
  );
};

export const ScrollProvider = ({ children }) => {
  const [scrollState, setScrollState] = useState({
    shouldScrollToBottom: false,
    shouldScrollToTop: false,
  });

  const setScrollPosition = useCallback((position) => {
    switch (position) {
      case 'top': {
        // eslint-disable-next-line
        setScrollState((prevState) => ({
          ...prevState,
          shouldScrollToTop: true,
          shouldScrollToBottom: false, // Новое значение для shouldScrollToBottom
        }));
        break;
      }
      case 'bottom': {
        // eslint-disable-next-line
        setScrollState((prevState) => ({
          ...prevState,
          shouldScrollToTop: false,
          shouldScrollToBottom: true,
        }));
        break;
      }
      default: {
        // eslint-disable-next-line
        setScrollState((prevState) => ({
          ...prevState,
          shouldScrollToTop: false,
          shouldScrollToBottom: false,
        }));
        break;
      }
    }
  }, []);

  const scrollToBottom = useCallback((ref) => {
    // eslint-disable-next-line
    ref.current.scrollTop = ref.current.scrollHeight;
  }, []);

  const scrollToTop = useCallback((ref) => {
    // eslint-disable-next-line
    ref.current.scrollTop = 0;
  }, []);

  const contextValue = useMemo(() => ({
    scrollState,
    setScrollPosition,
    scrollToBottom,
    scrollToTop,
  }), [scrollState, setScrollPosition, scrollToBottom, scrollToTop]);

  return (
    <ScrollContext.Provider value={contextValue}>
      { children }
    </ScrollContext.Provider>
  );
};
