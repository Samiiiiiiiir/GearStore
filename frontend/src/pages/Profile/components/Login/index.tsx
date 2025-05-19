import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { FormEvent, useEffect, useState } from 'react';

import { Input } from '@components/ui/Input';
import { Label } from '@components/ui/Label';
import { PageLoader } from '@components/ui/PageLoader';
import { AuthMode } from '@types';
import { auth } from '@utils';

interface LoginProps {
  setAuthMode: React.Dispatch<React.SetStateAction<AuthMode>>;
}

export const Login = ({ setAuthMode }: LoginProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (error) {
      timeoutId = setTimeout(() => {
        setError('');
      }, 15000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [error]);

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const formData = new FormData(e.currentTarget);
      const { email, password } = Object.fromEntries(formData);

      await signInWithEmailAndPassword(
        auth,
        email as string,
        password as string,
      );
    } catch (e: unknown) {
      if (e instanceof FirebaseError) {
        console.error(e.message);
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-950 rounded-lg text-white px-6 sm:px-10 lg:px-12">
      {isLoading && <PageLoader />}
      <form
        onSubmit={handleSubmitForm}
        className="max-w-4xl w-full mx-auto py-10 lg:py-12"
      >
        <div className="border-b-1 border-white/10 pb-6">
          <h2 className="uppercase text-xl font-semibold mb-2">Sign in</h2>
          <p className="text-gray-400">Please sign in to continue</p>
        </div>
        <div className="flex flex-col gap-6 lg:gap-8 py-6 lg:py-8">
          <div className="flex gap-6 lg:gap-8 flex-wrap">
            <Label className="grow" text="Email address">
              <Input required type="email" name="email" />
            </Label>
            <Label className="grow" text="Password">
              <Input required type="password" name="password" />
            </Label>
          </div>

          <div>
            {error && (
              <p className="tracking-wide font-semibold text-red-400 text-center">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="uppercase mt-4 lg:mt-6 cursor-pointer bg-indigo-700 w-full py-2 text-base font-bold tracking-wide text-gray-300 rounded-md hover:text-white hover:bg-indigo-600 duration-200"
            >
              sign in
            </button>
          </div>
        </div>
        <p className="text-center">
          <span className="text-gray-400">Don't have an account?</span>{' '}
          <button
            type="button"
            disabled={isLoading}
            onClick={() => setAuthMode(AuthMode.REGISTER)}
            className="underline cursor-pointer text-white/90 hover:text-white duration-200"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};
