import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar }  from './Navbar.jsx';
import { Card } from "./Card.jsx";
import { ErrorPage } from './ErrorPage.jsx';

const App = () => (
<>
  <Navbar />
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Card />} />
      <Route path="/login" element={<Card />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
</>
);

export default App;

