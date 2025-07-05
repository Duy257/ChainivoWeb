'use client';

import React from 'react';
import {Input, Badge} from 'antd';
import {
  SearchOutlined,
  ShoppingCartOutlined,
  FacebookOutlined,
  InstagramOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="bg-[#f53d2d] text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between text-xs py-1">
            <div className="flex space-x-4 items-center">
              <Link href="#" className="hover:text-gray-200">
                Kênh Người Bán
              </Link>
              <div className="border-l h-4 border-gray-400"></div>
              <Link href="#" className="hover:text-gray-200">
                Trở thành Người bán Shopee
              </Link>
              <div className="border-l h-4 border-gray-400"></div>
              <Link href="#" className="hover:text-gray-200">
                Tải ứng dụng
              </Link>
              <div className="border-l h-4 border-gray-400"></div>
              <span className="mr-1">Kết nối</span>
              <Link href="#" className="hover:text-gray-200">
                <FacebookOutlined />
              </Link>
              <Link href="#" className="hover:text-gray-200">
                <InstagramOutlined />
              </Link>
            </div>
            <div className="flex space-x-4 items-center">
              <Link href="#" className="hover:text-gray-200">
                Thông Báo
              </Link>
              <Link href="#" className="hover:text-gray-200">
                Hỗ Trợ
              </Link>
              <Link href="#" className="hover:text-gray-200">
                Tiếng Việt
              </Link>
              <Link
                href="/register"
                className="font-semibold hover:text-gray-200">
                Đăng Ký
              </Link>
              <div className="border-l h-4 border-gray-400"></div>
              <Link href="/login" className="font-semibold hover:text-gray-200">
                Đăng Nhập
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center">
          <div className="w-1/5">
            <Link href="/">
              <div className="text-4xl font-bold text-white bg-[#f53d2d] w-40 text-center py-1">
                Shopee
              </div>
            </Link>
          </div>
          <div className="w-3/5">
            <div className="relative">
              <Input
                placeholder="Shopee bao ship 0Đ - Đăng ký ngay!"
                className="w-full"
                size="large"
                style={{borderRadius: '2px'}}
                styles={{
                  input: {
                    backgroundColor: 'white',
                    border: '2px solid #f53d2d',
                  },
                }}
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#f53d2d] text-white px-5 py-1 rounded-sm flex items-center justify-center">
                <SearchOutlined style={{fontSize: '20px'}} />
              </button>
            </div>
            <div className="flex space-x-3 text-xs mt-1 text-gray-500">
              <Link href="#" className="hover:text-[#f53d2d]">
                Túi xách nữ
              </Link>
              <Link href="#" className="hover:text-[#f53d2d]">
                Dép
              </Link>
              <Link href="#" className="hover:text-[#f53d2d]">
                Váy
              </Link>
              <Link href="#" className="hover:text-[#f53d2d]">
                Áo khoác
              </Link>
              <Link href="#" className="hover:text-[#f53d2d]">
                Điện thoại
              </Link>
              <Link href="#" className="hover:text-[#f53d2d]">
                Tai nghe
              </Link>
            </div>
          </div>
          <div className="w-1/5 flex justify-center">
            <Badge count={5}>
              <ShoppingCartOutlined
                style={{fontSize: '32px', color: 'white', fill: '#f53d2d'}}
              />
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
