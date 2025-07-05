'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const flashSaleProducts = [
  {
    name: 'Sữa dưỡng Vinamilk',
    image:
      'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqxw45vj5jlv1b_tn',
    price: '₫219.961',
    sold: 'ĐANG BÁN CHẠY',
    isMall: true,
    discount: '-20%',
  },
  {
    name: 'La Roche-Posay',
    image:
      'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqg7b0vj5jlv9c_tn',
    price: '₫546.480',
    sold: 'ĐANG BÁN CHẠY',
    isMall: true,
    discount: '-15%',
  },
  {
    name: 'Nệm foam Aroma',
    image:
      'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqb0o5wj5jlv8e_tn',
    price: '₫3.705.000',
    sold: 'ĐANG BÁN CHẠY',
    isMall: true,
    discount: '-34%',
  },
  {
    name: 'Polo Manor',
    image:
      'https://down-vn.img.susercontent.com/file/sg-11134201-22100-1j1q2wzj5jlv1d_tn',
    price: '₫359.000',
    sold: 'ĐANG BÁN CHẠY',
    isMall: true,
    discount: '-31%',
  },
  {
    name: 'Samsung Inverter',
    image:
      'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqj4f5xj5jlv5c_tn',
    price: '₫6.390.000',
    sold: 'CHỈ CÒN 5',
    isMall: true,
    discount: '-27%',
  },
  {
    name: 'Kệ sách',
    image:
      'https://down-vn.img.susercontent.com/file/sg-11134201-22120-4c3k5h3j5jlvf0_tn',
    price: '₫656.500',
    sold: 'ĐANG BÁN CHẠY',
    isMall: false,
    discount: '-30%',
    isLiked: true,
  },
];

const FlashSale = () => {
  return (
    <div className="container mx-auto mt-4 bg-white">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-red-500 uppercase font-bold">Flash Sale</h2>
          {/* You can add a countdown timer component here */}
        </div>
        <Link href="#" className="text-sm text-red-500 hover:underline">
          Xem tất cả &gt;
        </Link>
      </div>
      <div className="flex overflow-x-auto p-4">
        {flashSaleProducts.map((product, index) => (
          <div key={index} className="flex-shrink-0 w-[190px] mr-2">
            <Link
              href="#"
              className="block border border-gray-100 hover:border-red-500 transition-all duration-300">
              <div className="relative bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={188}
                  height={188}
                  className="object-cover"
                />
                {product.isMall && (
                  <div className="absolute top-1.5 left-0 text-xs bg-red-600 text-white px-1 py-0.5">
                    Mall
                  </div>
                )}
                {product.isLiked && (
                  <div className="absolute top-1.5 left-0 text-xs bg-orange-500 text-white px-1 py-0.5">
                    Yêu thích
                  </div>
                )}
                <div className="absolute top-0 right-0 flex flex-col items-center justify-center w-9 h-8 bg-yellow-400/90">
                  <span className="text-red-500 text-xs font-bold">
                    {product.discount}
                  </span>
                  <span className="text-white text-[11px] font-medium">
                    GIẢM
                  </span>
                </div>
              </div>
              <div className="p-2 flex flex-col items-center">
                <p className="text-red-500 font-bold text-lg">
                  {product.price}
                </p>
                <div className="w-full bg-orange-200 rounded-full h-4 mt-2 relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-red-500"
                    style={{
                      width: product.sold === 'CHỈ CÒN 5' ? '85%' : '50%',
                    }}></div>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-xs font-semibold uppercase">
                    {product.sold}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashSale;
