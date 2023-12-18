import ReactDOM from 'react-dom/client';
import init from './init.jsx';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  // eslint-disable-next-line
  root.render(await init());
};
// eslint-disable-next-line
app();
