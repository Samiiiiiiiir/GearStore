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
    <div className="rounded-lg bg-gray-950 px-6 text-white sm:px-10 lg:px-12">
      {isLoading && <PageLoader />}
      <form
        onSubmit={handleSubmitForm}
        className="mx-auto w-full max-w-4xl py-10 lg:py-12"
      >
        <div className="border-b-1 border-white/10 pb-6">
          <h2 className="mb-2 text-xl font-semibold uppercase">Sign in</h2>
          <p className="text-gray-400">Please sign in to continue</p>
        </div>
        <div className="flex flex-col gap-6 py-6 lg:gap-8 lg:py-8">
          <div className="flex flex-wrap gap-6 lg:gap-8">
            <Label className="grow" text="Email address">
              <Input required type="email" name="email" />
            </Label>
            <Label className="grow" text="Password">
              <Input required type="password" name="password" />
            </Label>
          </div>

          <div>
            {error && (
              <p className="text-center font-semibold tracking-wide text-red-400">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="mt-4 w-full cursor-pointer rounded-md bg-indigo-700 py-2 text-base font-bold tracking-wide text-gray-300 uppercase duration-200 hover:bg-indigo-600 hover:text-white lg:mt-6"
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
            className="cursor-pointer text-white/90 underline duration-200 hover:text-white"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};
