import Image from 'next/image';
import { UpdateMember, DeleteMember } from '@/app/ui/member/button';
import { fetchFilteredMember } from '@/app/lib/data';

export default async function MemberTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const members = await fetchFilteredMember(query, currentPage);

  if (members.length === 0) {
    return <p>No member found.</p>;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-800 p-2 md:pt-0">
          <table className="min-w-full text-gray-200">
            <thead className="rounded-lg bg-gray-700 text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-6 py-5 font-medium text-left">
                  Nama
                </th>
                <th scope="col" className="px-6 py-5 font-medium text-left">
                  Email
                </th>
                <th scope="col" className="px-6 py-5 font-medium text-left">
                  Jenis Member
                </th>
                <th scope="col" className="px-6 py-5 font-medium text-left">
                  Tanggal Bergabung
                </th>
                <th scope="col" className="px-6 py-5 font-medium text-left">
                  Status Keanggotaan
                </th>
                <th scope="col" className="px-6 py-5 font-medium text-left"></th>
              </tr>
            </thead>
            <tbody className="bg-gray-900">
              {members.map((member) => (
                <tr key={member.id} className="w-full border-b border-gray-700 py-3 text-sm last-of-type:border-none">
                  <td className="whitespace-nowrap px-6 py-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={member.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${member.nama}'s profile picture`}
                      />
                      <p>{member.nama}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-3">
                    {member.email}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3">
                    {member.jenis_member}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3">
                    {new Date(member.tanggal_bergabung).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3">
                    {member.status_keanggotaan}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3">
                    <div className="flex justify-end gap-2">
                      <UpdateMember id={member.id} />
                      <DeleteMember id={member.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
