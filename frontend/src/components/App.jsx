import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
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
    socket.on('newMessage',(payload) => dispatch(addMessage(payload)));
    socket.on('newChannel', (payload) => (dispatch(addChannel(payload))));
    socket.on('renameChannel', (payload) => dispatch(renameChannel(payload)));
    socket.on('removeChannel', (payload) => dispatch(removeChannel(payload)));
    
    const emulateRegisteredUsers = async () => {

      try {
        const data1 = { username: 'admin2', password: 'admin2' };
        const data2 = { username: 'admin3', password: 'admin3' };
        const data3 = { username: 'admin4', password: 'admin4' };

        await axios.post(`/api/v1/signup`, data1);
        await axios.post(`/api/v1/signup`, data2);
        await axios.post(`/api/v1/signup`, data3);

      }catch(err) {
        return;
      }
    }
    emulateRegisteredUsers();
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
      { loggedIn && <div className="Toastify"></div> }
      { modal.isOpen && modals[modal.modalType] }
    </>
  );
};

export default App;
