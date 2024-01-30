// React Server Component
import React, { Suspense } from 'react';
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '../lib/data';
import { lusitana } from '../ui/fonts';
// Components
import RevenueChart from '../ui/dashboard/revenue-chart';
import LatestInvoices from '../ui/dashboard/latest-invoices';
import CardWrapper, { Card } from '../ui/dashboard/cards';
import { CardsSkeleton, RevenueChartSkeleton } from '../ui/skeletons';

// At render we can use async in react component because the component is render in server
const DashboardPage = async (): Promise<React.JSX.Element> => {
  const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData(); // wait for fetchLatestInvoices() to finish

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* as we can request data at the component level we can suspend the component until it obtains the data, this is useful to show the parts of the page as they are loading and if there are parts that take a long time to receive the data we can show the page*/}
        <Suspense fallback={<RevenueChartSkeleton/>}>
          <RevenueChart  />
        </Suspense>
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
};

export default DashboardPage;
