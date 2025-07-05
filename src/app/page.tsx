'use client';

import Banner from '@/app/components/Banner';
import Categories from '@/app/components/Categories';
import FlashSale from '@/app/components/FlashSale';
import QuickLinks from '@/app/components/QuickLinks';
import Footer from '@/components/layouts/Footer';

export default function Home() {
  return (
    <main className="bg-[#f5f5f5]">
      <div className="pb-10">
        <Banner />
        <QuickLinks />
        <Categories />
        <FlashSale />
      </div>
      <Footer />
    </main>
  );
}
