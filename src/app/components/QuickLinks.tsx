'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const quickLinks = [
  {
    name: 'Mã Giảm Giá',
    image:
      'https://cf.shopee.vn/file/vn-50009109-8a3875373a02737d04f9059599a38914_xhdpi',
  },
  {
    name: 'Hàng Chọn Giá Hời',
    image:
      'https://cf.shopee.vn/file/vn-50009109-1975fb1af75059595568f6f5904735ca_xhdpi',
  },
  {
    name: 'Deal Hot Giờ Vàng',
    image:
      'https://cf.shopee.vn/file/vn-50009109-4d6a8b382490b2e83e95dd197945d259_xhdpi',
  },
  {
    name: 'Shopee Style Voucher 30%',
    image:
      'https://cf.shopee.vn/file/vn-50009109-b7a44f33140b47161e053db3c5acb87f_xhdpi',
  },
  {
    name: 'Săn Ngay 100.000 Xu',
    image:
      'https://cf.shopee.vn/file/vn-50009109-8a3875373a02737d04f9059599a38914_xhdpi',
  },
  {
    name: 'Khách Hàng Thân Thiết',
    image:
      'https://cf.shopee.vn/file/vn-50009109-a563f6848f3224b4231b4b57b9e07573_xhdpi',
  },
];

const QuickLinks = () => {
  return (
    <div className="container mx-auto mt-4 bg-white py-4 px-2">
      <div className="flex justify-around items-center">
        {quickLinks.map(link => (
          <Link href="#" key={link.name}>
            <div className="flex flex-col items-center space-y-2 w-28 text-center">
              <Image src={link.image} alt={link.name} width={44} height={44} />
              <span className="text-sm text-gray-800">{link.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
