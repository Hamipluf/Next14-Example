import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchInvoicesPages } from '@/app/lib/data';

// By default the pages of nextJS recive the SearchParams for the params
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query: string;
    page: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page || 1);
  const totalPages = await fetchInvoicesPages(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2p md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense
        // The key in this case is used to make it render every time you change any of these values, without this key it will only render the first time.
        key={query + currentPage}
        fallback={<InvoicesTableSkeleton />}
      >
        {/* As we are doing the fetch at component level, in Table, we can avoid page reloading and only the table component will be updated without the need to re-render everything. */}
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
