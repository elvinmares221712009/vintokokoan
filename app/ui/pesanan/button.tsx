import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deletePesanan } from '@/app/lib/actions';

export function CreatePesanan() {
  return (
    <Link
      href="/dashboard/pesanan/create"
      className="flex h-10 items-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Pesanan</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdatePesanan({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/pesanan/${id}/edit`}
      className="rounded-md border p-2 hover:bg-green-700 hover:text-white transition duration-300 ease-in-out"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeletePesanan({ id }: { id: string }) {
  const deletePesananWithId = deletePesanan.bind(null, id);

  return (
    <form action={deletePesananWithId}>
      <button className="rounded-md border p-2 hover:bg-red-700 hover:text-white transition duration-300 ease-in-out">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}
