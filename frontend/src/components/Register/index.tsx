import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { FormEvent, useEffect, useState } from 'react';

import { Input } from '@components/Input';
import { PageLoader } from '@components/PageLoader';
import { auth, db } from '@lib/firebase';
import { AuthMode } from '@types';

import { Label } from './../Label';

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
    <div className="bg-gray-950 rounded-lg text-white px-6 sm:px-10 lg:px-12">
      {isLoading && <PageLoader />}
      <form
        onSubmit={handleSubmitForm}
        className="max-w-4xl w-full mx-auto py-10 lg:py-12"
      >
        <div className="border-b-1 border-white/10 pb-6">
          <h2 className="uppercase text-xl font-semibold mb-2">
            registration form
          </h2>
          <p className="text-gray-400">
            Please provide the required information to complete your
            registration
          </p>
        </div>
        <div className="flex flex-col gap-6 lg:gap-8 py-6 lg:py-8">
          <div className="flex gap-6 lg:gap-8 flex-wrap">
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
              <p className="tracking-wide font-semibold text-red-400 text-center">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="uppercase mt-4 lg:mt-6 cursor-pointer bg-indigo-700 w-full py-2 text-base font-bold tracking-wide text-gray-300 rounded-md hover:text-white hover:bg-indigo-600 duration-200"
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
            className="underline cursor-pointer text-white/90 hover:text-white duration-200"
          >
            Sign in
          </button>
        </p>
      </form>
    </div>
  );
};
