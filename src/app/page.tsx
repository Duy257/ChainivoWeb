'use client';

import Banner from '@/app/components/Banner';
import Categories from '@/app/components/Categories';
import FlashSale from '@/app/components/FlashSale';
import QuickLinks from '@/app/components/QuickLinks';
import Header from '@/components/layouts/Header';

export default function Home() {
  return (
    <main className="bg-[#f5f5f5]">
      <Header />
      <div className="pb-10">
        <Banner />
        <QuickLinks />
        <Categories />
        <FlashSale />
      </div>
    </main>
  );
}
