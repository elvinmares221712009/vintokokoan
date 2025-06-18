'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { ButtonLogin } from './button';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-900 px-6 pb-4 pt-8 shadow-lg">
        <h1 className={`${lusitana.className} mb-3 text-3xl text-white`}>
          Please log in to continue
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-2 block text-sm font-medium text-gray-400"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder-gray-500 outline-none focus:border-amber-600 focus:ring-amber-600"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-amber-500" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-2 block text-sm font-medium text-gray-400"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder-gray-500 outline-none focus:border-amber-600 focus:ring-amber-600"
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-amber-500" />
            </div>
          </div>
        </div>
        <LoginButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <ButtonLogin className="mt-4 w-full rounded-lg bg-purple-700 py-2 text-sm font-medium text-white hover:bg-purple-600 focus:bg-purple-600" aria-disabled={pending}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-white" />
    </ButtonLogin>
  );
}
