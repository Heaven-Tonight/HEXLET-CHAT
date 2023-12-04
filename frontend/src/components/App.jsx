import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from '../routes.js';
import Navbar from './Navbar.jsx';
import ChatPage  from './pages/ChatPage.jsx';
import LoginPage  from './pages/LoginPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import RegistrationPage  from './pages/RegistrationPage.jsx';
import useAuth from '../hooks/index.jsx';
import {useEffect} from "react";
import axios from "axios";

const App = () => {

  useEffect(() => {

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
    </>
  );
};

export default App;
