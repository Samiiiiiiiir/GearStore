import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { AppRouter } from '@router/AppRouter';
import { persistor, store } from '@store';

import './index.css';

import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>,
);
/* <StrictMode> </StrictMode> */
