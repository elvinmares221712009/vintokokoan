'use client';

import { PelangganField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  StarIcon,
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createMember } from '@/app/lib/actions';
import { useFormState, useFormStatus } from 'react-dom';
import type { MemberFormState } from '@/app/lib/actions';

export default function Form({ pelanggan }: { pelanggan: PelangganField[] }) {
  const initialState: MemberFormState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createMember, initialState);
  const { pending } = useFormStatus();

  return (
    <form action={dispatch} className="max-w-lg mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Create Member</h2>
      
      {state?.message && (
        <div className={`p-3 mb-4 text-sm rounded-md ${
          state.message.includes('Error') || state.message.includes('Failed')
            ? 'bg-red-100/10 text-red-400'
            : 'bg-green-100/10 text-green-400'
        }`}>
          {state.message}
        </div>
      )}

      <div className="rounded-md bg-gray-800 p-4 md:p-6">
        {/*  Customer Selection */}
        <div className="mb-4">
          <label htmlFor="pelanggan" className="mb-2 block text-sm font-medium text-white">
            Select Customer
          </label>
          <div className="relative">
            <select
              id="pelanggan"
              name="pelangganId"
              className={`peer block w-full cursor-pointer rounded-md border ${
                state?.errors?.pelangganId ? 'border-red-500' : 'border-gray-700'
              } bg-gray-800 py-2 pl-10 text-sm text-white placeholder:text-gray-500 focus:border-violet-500 focus:ring-violet-500`}
              defaultValue=""
              aria-describedby="pelanggan-error"
              required
            >
              <option value="" disabled>
                Select a customer
              </option>
              {pelanggan.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.nama}
                </option>
              ))}
            </select>
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {state?.errors?.pelangganId && (
            <div id="pelanggan-error" className="mt-2 text-sm text-red-500">
              {state.errors.pelangganId[0]}
            </div>
          )}
        </div>

        {/* Membership Type */}
        <fieldset className="mb-4">
          <legend className="mb-2 block text-sm font-medium text-white">
            Select Membership Type
          </legend>
          <div className="rounded-md border border-gray-700 bg-gray-800 px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="Silver"
                  name="jenis_member"
                  type="radio"
                  value="Silver"
                  required
                  className="h-4 w-4 cursor-pointer border-gray-600 bg-gray-800 text-violet-600 focus:ring-violet-500"
                />
                <label
                  htmlFor="Silver"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Silver <StarIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="Gold"
                  name="jenis_member"
                  type="radio"
                  value="Gold"
                  className="h-4 w-4 cursor-pointer border-gray-600 bg-gray-800 text-violet-600 focus:ring-violet-500"
                />
                <label
                  htmlFor="Gold"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Gold <StarIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="Platinum"
                  name="jenis_member"
                  type="radio"
                  value="Platinum"
                  className="h-4 w-4 cursor-pointer border-gray-600 bg-gray-800 text-violet-600 focus:ring-violet-500"
                />
                <label
                  htmlFor="Platinum"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Platinum <StarIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          {state?.errors?.jenis_member && (
            <div className="mt-2 text-sm text-red-500">
              {state.errors.jenis_member[0]}
            </div>
          )}
        </fieldset>

        {/* Membership Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium text-white">
            Select Membership Status
          </legend>
          <div className="rounded-md border border-gray-700 bg-gray-800 px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="Aktif"
                  name="status_keanggotaan"
                  type="radio"
                  value="Aktif"
                  required
                  defaultChecked
                  className="h-4 w-4 cursor-pointer border-gray-600 bg-gray-800 text-violet-600 focus:ring-violet-500"
                />
                <label
                  htmlFor="Aktif"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Active <CheckCircleIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="TidakAktif"
                  name="status_keanggotaan"
                  type="radio"
                  value="Tidak Aktif"
                  className="h-4 w-4 cursor-pointer border-gray-600 bg-gray-800 text-violet-600 focus:ring-violet-500"
                />
                <label
                  htmlFor="TidakAktif"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Inactive <XCircleIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          {state?.errors?.status_keanggotaan && (
            <div className="mt-2 text-sm text-red-500">
              {state.errors.status_keanggotaan[0]}
            </div>
          )}
        </fieldset>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/member"
          className="flex h-10 items-center rounded-lg bg-gray-700 px-4 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-600"
        >
          Cancel
        </Link>
        <Button type="submit" aria-disabled={pending}>
          {pending ? 'Creating...' : 'Create Member'}
        </Button>
      </div>
    </form>
  );
}
