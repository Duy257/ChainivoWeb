'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    name: 'Thời Trang Nam',
    image: 'https://cf.shopee.vn/file/687f3967b7c2fe6a134a2c11894eea4b_tn',
  },
  {
    name: 'Điện Thoại & Phụ Kiện',
    image: 'https://cf.shopee.vn/file/31234a27876fb89cd522d7e3db1ba5ca_tn',
  },
  {
    name: 'Thiết Bị Điện Tử',
    image: 'https://cf.shopee.vn/file/978b9e4cb61c611aa402459e3555303b_tn',
  },
  {
    name: 'Máy Tính & Laptop',
    image: 'https://cf.shopee.vn/file/c3f3edfaa9f6dafc4825b77d8449999d_tn',
  },
  {
    name: 'Máy Ảnh & Máy Quay Phim',
    image: 'https://cf.shopee.vn/file/ec14dd4fc238e676e43be2a91874a6de_tn',
  },
  {
    name: 'Đồng Hồ',
    image: 'https://cf.shopee.vn/file/86c294aae72ca1db5f541790b7796260_tn',
  },
  {
    name: 'Giày Dép Nam',
    image: 'https://cf.shopee.vn/file/74ca51777cda6e906b75c5ea7b207d57_tn',
  },
  {
    name: 'Thiết Bị Điện Gia Dụng',
    image: 'https://cf.shopee.vn/file/7abfbfee3c4844652b4a8245e473d85e_tn',
  },
  {
    name: 'Thể Thao & Du Lịch',
    image: 'https://cf.shopee.vn/file/6cb7e633f8b63757463b676bd19a50e4_tn',
  },
  {
    name: 'Ô Tô & Xe Máy & Xe Đạp',
    image: 'https://cf.shopee.vn/file/3fb459e3449905545701b418e8220334_tn',
  },
  {
    name: 'Thời Trang Nữ',
    image: 'https://cf.shopee.vn/file/75ea42f9eca124e9cb3cde744c160e93_tn',
  },
  {
    name: 'Mẹ & Bé',
    image: 'https://cf.shopee.vn/file/099edde1ab31df35bc255912bab54a5e_tn',
  },
  {
    name: 'Nhà Cửa & Đời Sống',
    image: 'https://cf.shopee.vn/file/24b194a695ea59d384768b7b471d563f_tn',
  },
  {
    name: 'Sắc Đẹp',
    image: 'https://cf.shopee.vn/file/53b316f21a4854a362243d67f45b1403_tn',
  },
  {
    name: 'Sức Khỏe',
    image: 'https://cf.shopee.vn/file/49119e891a44fa135f5f6f6fdce08afc_tn',
  },
  {
    name: 'Giày Dép Nữ',
    image: 'https://cf.shopee.vn/file/48630b7c76a7b62bc070c9e227097847_tn',
  },
  {
    name: 'Túi Ví Nữ',
    image: 'https://cf.shopee.vn/file/fa6ada2555ca8e54d543232208de5091_tn',
  },
  {
    name: 'Phụ Kiện & Trang Sức Nữ',
    image: 'https://cf.shopee.vn/file/8e71245b9659ea72c1b4e737be5cf42e_tn',
  },
  {
    name: 'Bách Hóa Online',
    image: 'https://cf.shopee.vn/file/c432168ee788f903f1ea024487f2c889_tn',
  },
  {
    name: 'Nhà Sách Online',
    image: 'https://cf.shopee.vn/file/36013311815c55d303b0e6c62d6a8139_tn',
  },
];

const Categories = () => {
  return (
    <div className="container mx-auto mt-4 bg-white">
      <div className="p-4 border-b">
        <h2 className="text-gray-500 font-semibold">DANH MỤC</h2>
      </div>
      <div className="grid grid-cols-10">
        {categories.map(category => (
          <Link href="#" key={category.name}>
            <div className="flex flex-col items-center justify-center text-center p-2 border-r border-b hover:shadow-lg transition-shadow duration-200 h-full">
              <div className="w-20 h-20 relative">
                <Image
                  src={category.image}
                  alt={category.name}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <span className="text-sm mt-2 h-10 flex items-center">
                {category.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
