import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { BrowserRouter } from 'react-router-dom';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './components/App';
import { Provider } from 'react-redux';
import { AuthProvider, ModalProvider, DropdownProvider } from './providers/index.jsx';
import resources from './locales/index.js';
import store from './store/index.js';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });
  
  const rollbarConfig = {
    accessToken: '7737b8544bde41b8bf87386aaf3e3e87',
    environment: 'testenv',
  };
  
  function TestError() {
    const a = null;
    return a.hello();
  }

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <TestError />
      </ErrorBoundary>
      <AuthProvider>
        <I18nextProvider i18n={i18n}>
          <ModalProvider>
            <BrowserRouter>
              <Provider store={store}>
                <App />
              </Provider>
            </BrowserRouter>
          </ModalProvider>
        </I18nextProvider>
      </AuthProvider>
    </RollbarProvider>
    
  );
};

export default init;

