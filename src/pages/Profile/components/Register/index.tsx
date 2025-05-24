import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { FormEvent, useEffect, useState } from 'react';

import { Input } from '@components/ui/Input';
import { Label } from '@components/ui/Label';
import { PageLoader } from '@components/ui/PageLoader';
import { AuthMode } from '@types';
import { auth, db } from '@utils';

interface RegisterProps {
  setAuthMode: React.Dispatch<React.SetStateAction<AuthMode>>;
}

export const Register = ({ setAuthMode }: RegisterProps) => {
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
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const { email, password, firstname, lastname } =
        Object.fromEntries(formData);

      const res = await createUserWithEmailAndPassword(
        auth,
        email as string,
        password as string,
      );

      await setDoc(doc(db, 'users', res.user.uid), {
        firstname,
        lastname,
        email,
        id: res.user.uid,
      });
      setAuthMode(AuthMode.LOGIN);
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
          <h2 className="mb-2 text-xl font-semibold uppercase">
            registration form
          </h2>
          <p className="text-gray-400">
            Please provide the required information to complete your
            registration
          </p>
        </div>
        <div className="flex flex-col gap-6 py-6 lg:gap-8 lg:py-8">
          <div className="flex flex-wrap gap-6 lg:gap-8">
            <Label className="grow" text="First name">
              <Input required type="text" name="firstname" />
            </Label>
            <Label className="grow" text="Last name">
              <Input required type="text" name="lastname" />
            </Label>
          </div>
          <Label text="Email address">
            <Input required type="email" name="email" />
          </Label>
          <Label text="Password">
            <Input required type="password" name="password" />
          </Label>
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
              send
            </button>
          </div>
        </div>
        <p className="text-center">
          <span className="text-gray-400">Alreade have an account?</span>{' '}
          <button
            type="button"
            disabled={isLoading}
            onClick={() => setAuthMode(AuthMode.LOGIN)}
            className="cursor-pointer text-white/90 underline duration-200 hover:text-white"
          >
            Sign in
          </button>
        </p>
      </form>
    </div>
  );
};
