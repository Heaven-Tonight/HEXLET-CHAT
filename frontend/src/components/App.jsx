import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from '../routes.js';
import Navbar from './Navbar.jsx';
import ChatPage  from './pages/ChatPage.jsx';
import LoginPage  from './pages/LoginPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import RegistrationPage  from './pages/RegistrationPage.jsx';
import AuthContext from '../contexts/AuthProvider.jsx';

const App = () => {
  const [isAuthed, setAuth] = useState(false);
  const Redirect = isAuthed ? <ChatPage /> : <Navigate to={routes.login} />
  return (
    <>
      <Navbar/>
      <AuthContext.Provider value={{isAuthed, setAuth}}>
        <Routes>
          <Route path={routes.root} element={ Redirect }/>
          <Route path={routes.login} element={<LoginPage />}/>
          <Route path={routes.signup} element={<RegistrationPage />}/>
          <Route path={routes.others} element={<ErrorPage />}/>
        </Routes>
        </AuthContext.Provider>
    </>
  );
}

export default App;
