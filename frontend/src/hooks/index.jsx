import { useContext } from 'react';
import { AuthContext, ModalContext, ScrollContext } from '../contexts/index.jsx';

export const useAuth = () => useContext(AuthContext);

export const useModal = () => useContext(ModalContext);

export const useScroll = () => useContext(ScrollContext);
