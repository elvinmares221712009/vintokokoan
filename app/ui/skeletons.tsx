// Shimmer effect CSS class
const skeletonColors = {
  dark: 'bg-gray-800',
  medium: 'bg-gray-700',
  light: 'bg-gray-100',
};
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

  export function CardSkeleton() {
    return (
      <div
        className="relative overflow-hidden rounded-lg bg-gray-800 p-2 shadow-sm"
      >
        <div className="flex p-2">
          <div className="h-5 w-5 rounded-md bg-gray-500" />
          <div className="ml-2 h-6 w-16 rounded-md bg-gray-500 text-sm font-medium" />
        </div>
        <div className="flex items-center justify-center truncate rounded-lg bg-gray-700 px-3 py-4">
          <div className="h-7 w-20 rounded-md bg-gray-500" />
        </div>
      </div>
    );
  }
  
  

  
  export function CardsSkeleton() {
    return (
      <>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </>
    );
  }
  
  export function RevenueChartSkeleton() {
    return (
      <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
        <div className="mb-4 h-8 w-36 rounded-md bg-gray-800"></div>
        <div className={`rounded-xl p-4 ${skeletonColors.medium}`}>
          <div className="grid h-[410px] grid-cols-12 items-end gap-2 bg-gray-800 p-4 sm:grid-cols-13 md:gap-4">
            <div className={`h-1/2 ${skeletonColors.medium} rounded-md`}></div>
            <div className={`h-2/3 ${skeletonColors.medium} rounded-md`}></div>
            <div className={`h-3/4 ${skeletonColors.medium} rounded-md`}></div>
            <div className={`h-5/6 ${skeletonColors.medium} rounded-md`}></div>
            <div className={`h-full ${skeletonColors.medium} rounded-md`}></div>
            <div className={`h-1/2 ${skeletonColors.medium} rounded-md`}></div>
            <div className={`h-2/3 ${skeletonColors.medium} rounded-md`}></div>
            <div className={`h-3/4 ${skeletonColors.medium} rounded-md`}></div>
            <div className={`h-5/6 ${skeletonColors.medium} rounded-md`}></div>
            <div className={`h-full ${skeletonColors.medium} rounded-md`}></div>
            <div className={`h-5/6 ${skeletonColors.medium} rounded-md`}></div>
            <div className={`h-full ${skeletonColors.medium} rounded-md`}></div>
          </div>
          <div className="flex items-center pb-2 pt-6">
            <div className="h-5 w-5 rounded-full bg-gray-700"></div>
            <div className="ml-2 h-4 w-20 rounded-md bg-gray-700"></div>
          </div>
        </div>
      </div>
    );
  }
  
  export function PesananSkeleton() {
    return (
      <div
        className={`${shimmer} relative flex flex-row items-center justify-between border-b border-gray-800 py-4 ${skeletonColors.medium}`}
      >
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-500"></div>
          <div className="min-w-0">
            <div className="h-5 w-40 rounded-md bg-gray-500"></div>
            <div className="mt-2 h-4 w-12 rounded-md bg-gray-500"></div>
          </div>
        </div>
        <div className="mt-2 h-4 w-12 rounded-md bg-gray-500"></div>
      </div>
    );
  }
  
  export function LatestPesananSkeleton() {
    return (
      <div
        className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4`}
      >
        <div className="mb-4 h-8 w-36 rounded-md bg-gray-800"></div>
        <div className={`flex grow flex-col justify-between rounded-xl p-4 ${skeletonColors.medium}`}>
          <div className="px-6">
            <PesananSkeleton />
            <PesananSkeleton />
            <PesananSkeleton />
            <PesananSkeleton />
            <PesananSkeleton />
            <div className="flex items-center pb-2 pt-6">
              <div className="h-5 w-5 rounded-full bg-gray-700"></div>
              <div className="ml-2 h-4 w-20 rounded-md bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  

// Header Skeleton
function HeaderSkeleton() {
  return (
    <header className="flex items-center justify-between p-6 bg-gray-800 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-gray-700"></div>
        <div className="h-8 w-48 rounded-md bg-gray-700"></div>
      </div>
    </header>
  );
}

// Dashboard Card Skeleton
function DashboardCardSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden flex items-center p-4 bg-gray-800 rounded-lg shadow-lg`}>
      <div className="p-3 bg-gray-700 rounded-full h-12 w-12"></div>
      <div className="ml-4">
        <div className="h-5 w-24 bg-gray-700 rounded-md mb-2"></div>
        <div className="h-6 w-16 bg-gray-700 rounded-md"></div>
      </div>
    </div>
  );
}

// Chart Skeleton
function ChartSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden bg-gray-800 p-6 rounded-lg shadow-lg`}>
      <div className="h-6 w-32 bg-gray-700 rounded-md mb-4"></div>
      <div className="h-64 bg-gray-700 rounded-lg"></div>
    </div>
  );
}

// Footer Skeleton
function FooterSkeleton() {
  return (
    <footer className="p-4 bg-gray-800 text-center">
      <div className="h-4 w-64 bg-gray-700 rounded-md mx-auto"></div>
    </footer>
  );
}

// Full Dashboard Skeleton
export default function DashboardSkeleton() {
  return (
    <main className="flex flex-col bg-gray-900 text-white min-h-screen">
      <HeaderSkeleton />

      <section className="flex-grow p-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 p-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          <RevenueChartSkeleton />
          <LatestPesananSkeleton />
        </div>
      </section>

      <FooterSkeleton />
    </main>
  );
}

// Search Box Skeleton
export function SearchSkeleton() {
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <div className="peer block w-[970px] h-[30px] rounded-sm  bg-gray-800 py-[9px] pl-10  outline-2">
      </div>
    </div>
  );

}


export function PelangganMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-gray-800 p-4">
      <div className="flex items-center justify-between border-b border-gray-800 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100"></div>
          <div className="h-10 w-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

export function PelangganTableSkeleton() {
  return (

    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-700 p-2 md:pt-0">
          <div className="md:hidden">
            <PelangganMobileSkeleton />
            <PelangganMobileSkeleton />
            <PelangganMobileSkeleton />
            <PelangganMobileSkeleton />
            <PelangganMobileSkeleton />
            <PelangganMobileSkeleton />
           

          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Alamat
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Nomor Telepon
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-500"></div>
          <div className="h-6 w-24 rounded bg-gray-500"></div>
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-500"></div>
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-500"></div>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-500"></div>
      </td>
      {/* Status */}
      {/* <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td> */}
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-500"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-500"></div>
        </div>
      </td>
    </tr>
  );
}

export function PelangganSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-gray-200" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-200" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
    </div>
  );
}

export function LatestPelangganSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4`}
    >
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
        <div className="bg-white px-6">
          <PelangganSkeleton />
          <PelangganSkeleton />
          <PelangganSkeleton />
          <PelangganSkeleton />
          <PelangganSkeleton />
          <div className="flex items-center pb-2 pt-6">
            <div className="h-5 w-5 rounded-full bg-gray-200" />
            <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PagePelangganSkeleton() {
  return (
    <>
     <HeaderSkeleton />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SearchSkeleton />
        <CreateSkeleton />
      </div>
      <div className="mt-6 flow-root">
        <PelangganTableSkeleton />
      </div>
    </>
  );
}

export function CreateSkeleton() {
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <div className="peer block w-[200px] h-[30px] rounded-sm  bg-gray-800 py-[9px] pl-10  outline-2">
      </div>
    </div>
  );
}

export function TableRow5Skeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-500"></div>
          <div className="h-6 w-24 rounded bg-gray-500"></div>
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-500"></div>
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-500"></div>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-500"></div>
      </td>
      {/* Status */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-500"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-500"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-500"></div>
        </div>
      </td>
    </tr>
  );
}

export function TableRow6Skeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-500"></div>
          <div className="h-6 w-24 rounded bg-gray-500"></div>
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-500"></div>
      </td>
      {/* Produk */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-500"></div>
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-500"></div>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-500"></div>
      </td>
      {/* Status */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-500"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-500"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-500"></div>
        </div>
      </td>
    </tr>
  );
}

export function ProdukTableSkeleton() {
  return (

    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-700 p-2 md:pt-0">
          <div className="md:hidden">
            <PelangganMobileSkeleton />
            <PelangganMobileSkeleton />
            <PelangganMobileSkeleton />
            <PelangganMobileSkeleton />
            <PelangganMobileSkeleton />
            <PelangganMobileSkeleton />
           

          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Harga
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Stok
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Kategori
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function PageProdukSkeleton() {
  return (
    <>
     <HeaderSkeleton />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SearchSkeleton />
        <CreateSkeleton />
      </div>
      <div className="mt-6 flow-root">
        <ProdukTableSkeleton />
      </div>
    </>
  );
}

export function PesananTableSkeleton() {
  return (

    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-700 p-2 md:pt-0">
          <div className="md:hidden">
            <PelangganMobileSkeleton />
            <PelangganMobileSkeleton />
            <PelangganMobileSkeleton />
            <PelangganMobileSkeleton />
            <PelangganMobileSkeleton />
            <PelangganMobileSkeleton />
           

          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Produk
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Tanggal
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Total Harga
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status Pesanan
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800">
              <TableRow6Skeleton />
              <TableRow6Skeleton />
              <TableRow6Skeleton />
              <TableRow6Skeleton />
              <TableRow6Skeleton />
              <TableRow6Skeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function PagePesananSkeleton() {
  return (
    <>
     <HeaderSkeleton />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SearchSkeleton />
        <CreateSkeleton />
      </div>
      <div className="mt-6 flow-root">
        <PesananTableSkeleton />
      </div>
    </>
  );
}

export function MemberTableSkeleton() {
  return (

    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-700 p-2 md:pt-0">
          <div className="md:hidden">
            <PelangganMobileSkeleton />
            <PelangganMobileSkeleton />
            <PelangganMobileSkeleton />
            <PelangganMobileSkeleton />
            <PelangganMobileSkeleton />
            <PelangganMobileSkeleton />
           

          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Jenis Member
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Tanggal Bergabung
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status Keanggotaan
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800">
              <TableRow5Skeleton />
              <TableRow5Skeleton />
              <TableRow5Skeleton />
              <TableRow5Skeleton />
              <TableRow5Skeleton />
              <TableRow5Skeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function PageMemberSkeleton() {
  return (
    <>
     <HeaderSkeleton />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SearchSkeleton />
        <CreateSkeleton />
      </div>
      <div className="mt-6 flow-root">
        <MemberTableSkeleton />
      </div>
    </>
  );
}