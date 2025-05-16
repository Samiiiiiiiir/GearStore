import { useState } from 'react';

import { AuthMode } from '@types';

import { Login } from './../Login';
import { Register } from './../Register';

export const AuthForm = () => {
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.REGISTER);

  return (
    <div>
      {authMode === AuthMode.LOGIN ? (
        <Login />
      ) : (
        <Register setAuthMode={setAuthMode} />
      )}
    </div>
  );
};
