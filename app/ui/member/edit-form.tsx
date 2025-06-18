'use client';

import { PelangganField, MemberForm } from '@/app/lib/definitions';
import {
  StarIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateMember, updatePesanan } from '@/app/lib/actions';

export default function EditMemberForm({
  member,
  pelanggan,
}: {
  member: MemberForm;
  pelanggan: PelangganField[];
}) {
  const updateMemberWithId = updateMember.bind(null, member.id);
  return (
    <form action={updateMemberWithId} method="post" className="max-w-lg mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Edit Member</h2>
      <div className="rounded-md bg-gray-800 p-4 md:p-6">
        {/* Nama Pelanggan*/}
        <div className="mb-4">
          <label htmlFor="pelanggan" className="mb-2 block text-sm font-medium text-white">
            Masukan Pelanggan
          </label>
          <div className="relative">
            <select
              id="pelanggan"
              name="pelangganId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder:text-gray-500 focus:border-violet-500 focus:ring-violet-500"
              defaultValue={member.pelanggan_id}
            >
              <option value="" disabled>
                Select a pelanggan
              </option>
              {pelanggan.map((pelanggan) => (
                <option key={pelanggan.id} value={pelanggan.id}>
                  {pelanggan.nama}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Jenis Member */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium text-white">
            PIlih Jenis Member
          </legend>
          <div className="rounded-md border border-gray-700 bg-gray-800 px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="Silver"
                  name="jenis_member"
                  type="radio"
                  value="Silver"
                  className="h-4 w-4 cursor-pointer border-gray-600 bg-gray-800 text-gray-600 focus:ring-violet-500"
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
                  className="h-4 w-4 cursor-pointer border-gray-600 bg-gray-800 text-gray-600 focus:ring-violet-500"
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
                  className="h-4 w-4 cursor-pointer border-gray-600 bg-gray-800 text-gray-600 focus:ring-violet-500"
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
        </fieldset>

        {/* Status Keaggotaan */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium text-white">
            Pilih Status Keanggotaan
          </legend>
          <div className="rounded-md border border-gray-700 bg-gray-800 px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="Aktif"
                  name="status_keanggotaan"
                  type="radio"
                  value="Aktif"
                  className="h-4 w-4 cursor-pointer border-gray-600 bg-gray-800 text-gray-600 focus:ring-violet-500"
                />
                <label
                  htmlFor="Aktif"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Aktif <CheckCircleIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="TidakAktif"
                  name="status_keanggotaan"
                  type="radio"
                  value="Tidak Aktif"
                  className="h-4 w-4 cursor-pointer border-gray-600 bg-gray-800 text-gray-600 focus:ring-violet-500"
                />
                <label
                  htmlFor="TidakAktif"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Tidak Aktif <XCircleIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/pesanan"
          className="flex h-10 items-center rounded-lg bg-gray-700 px-4 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-600"
        >
          Cancel
        </Link>
        <Button type="submit" className="h-10 rounded-lg bg-violet-500 px-4 text-sm font-medium text-white transition-colors hover:bg-violet-600">
          Edit Pesanan
        </Button>
      </div>
    </form>
  );
}
