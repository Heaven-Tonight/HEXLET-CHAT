import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './Navbar.jsx';
import ChatPage  from './pages/ChatPage.jsx';
import LoginPage  from './pages/LoginPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import RegistrationPage  from './pages/RegistrationPage.jsx';
import { useAuth, useModal } from '../hooks/index.jsx';
import routes from '../routes.js';
import modals from './modals/index.js';
import socket from '../socket.js';
import { addMessage } from '../store/slices/messagesSlice.js';
import { addChannel, renameChannel, removeChannel } from '../store/slices/channelSlice.js';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on(routes.server.socket.newMessage, (payload) => dispatch(addMessage(payload)));
    socket.on(routes.server.socket.newChannel, (payload) => (dispatch(addChannel(payload))));
    socket.on(routes.server.socket.renameChannel, (payload) => dispatch(renameChannel(payload)));
    socket.on(routes.server.socket.removeChannel, (payload) => dispatch(removeChannel(payload)));
  }, []);

  const { loggedIn } = useAuth();
  const  modal = useModal();
  
  const Redirect = loggedIn ? <ChatPage /> : <Navigate to={routes.login} />
  
  return (
    <>
      <div className="d-flex flex-column h-100">
        <Navbar/>
          <Routes>
            <Route path={routes.root} element={ Redirect }/>
            <Route path={routes.login} element={<LoginPage />}/>
            <Route path={routes.signup} element={<RegistrationPage />}/>
            <Route path={routes.others} element={<ErrorPage />}/>
          </Routes>
      </div>
      { loggedIn && <div className="Toastify">
        { modal.isShownToastify &&  <ToastContainer /> }
      </div> }
      { modal.isOpen && modals[modal.modalType] }
    </>
  );
};

export default App;

