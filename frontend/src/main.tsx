import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { AppRouter } from '@router/AppRouter';
import { store } from '@store';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
);
/* <StrictMode> </StrictMode> */
