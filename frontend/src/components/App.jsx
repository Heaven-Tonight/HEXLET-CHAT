import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from '../routes.js';
import { Navbar }  from './Navbar.jsx';
import { LoginPage } from "./pages/LoginPage.jsx";
import { ErrorPage } from './pages/ErrorPage.jsx';
import { RegistrationPage } from './pages/RegistrationPage.jsx';

const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const Redirect = user ? <Navigate to={routes.root} /> : <Navigate to={routes.login} />;
  return (
    <>
      <Navbar/>
        <Routes>
          <Route path={routes.root} element={ Redirect }/>
          <Route path={routes.login} element={<LoginPage />}/>
          <Route path={routes.signup} element={<RegistrationPage />}/>
          <Route path={routes.others} element={<ErrorPage />}/>
        </Routes>
    </>
  );
}

export default App;
