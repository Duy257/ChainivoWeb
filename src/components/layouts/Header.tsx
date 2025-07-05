'use client';

import React, {useState} from 'react';
import {Input, Badge, Avatar} from 'antd';
import {
  SearchOutlined,
  ShoppingCartOutlined,
  BellOutlined,
  CloudDownloadOutlined,
  MenuOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  {
    href: '#',
    icon: <BellOutlined style={{fontSize: '24px', color: '#FFC043'}} />,
    text: 'Thông báo',
    badge: 5,
  },
  {
    href: '#',
    icon: <CloudDownloadOutlined style={{fontSize: '24px'}} />,
    text: 'Tải ứng dụng',
  },
  {
    href: '#',
    icon: (
      <Image
        src="https://flagcdn.com/w20/vn.png"
        width={20}
        height={15}
        alt="Vietnam Flag"
      />
    ),
    text: 'Việt Nam',
  },
  {
    href: '#',
    icon: <ShoppingCartOutlined style={{fontSize: '24px'}} />,
    text: 'Giỏ hàng',
  },
];

const Logo = () => (
  <div className="flex-shrink-0">
    <Link href="/">
      <Image src="/logo.svg" alt="logo" width={60} height={60} />
    </Link>
  </div>
);

const SearchBar = () => (
  <div className="flex-grow">
    <div className="relative">
      <Input
        placeholder="Nhập tên sản phẩm tại đây"
        prefix={<SearchOutlined className="text-gray-400 text-lg" />}
        suffix={
          <button className="text-gray-500 hover:text-gray-700">Hủy</button>
        }
        size="large"
        className="w-full"
      />
    </div>
  </div>
);

const UserInfo = () => (
  <div className="flex items-center space-x-2">
    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
    <div className="hidden xl:block">
      <div>Nguyễn Đức Long</div>
      <div className="text-xs">
        <span>Ruby</span>
        <span> • </span>
        <span>09***135</span>
      </div>
    </div>
  </div>
);

const AuthButtons = () => (
  <div className="flex items-center space-x-4">
    <Link href="/register" className="font-semibold hover:text-gray-200">
      Đăng Ký
    </Link>
    <div className="border-l h-4 border-gray-400" />
    <Link href="/login" className="font-semibold hover:text-gray-200">
      Đăng Nhập
    </Link>
  </div>
);

const DesktopNav = ({isLoggedIn}: {isLoggedIn: boolean}) => (
  <div className="hidden md:flex flex-shrink-0 items-center space-x-4">
    {navLinks.map(link => (
      <Link
        key={link.text}
        href={link.href}
        className="flex items-center space-x-2 hover:text-gray-200">
        {link.badge ? (
          <Badge count={link.badge} size="small">
            {link.icon}
          </Badge>
        ) : (
          link.icon
        )}
        <span className="hidden lg:inline">{link.text}</span>
      </Link>
    ))}
    <div className="pl-4 border-l h-8 border-gray-500" />
    {isLoggedIn ? <UserInfo /> : <AuthButtons />}
  </div>
);

const MobileNav = ({
  isLoggedIn,
  onClose,
}: {
  isLoggedIn: boolean;
  onClose: () => void;
}) => (
  <div className="absolute top-0 left-0 w-full h-screen bg-[#1C33FF] z-50 p-4 md:hidden">
    <div className="flex justify-end mb-4">
      <button onClick={onClose}>
        <CloseOutlined style={{fontSize: '24px'}} />
      </button>
    </div>
    <div className="flex flex-col space-y-4">
      <div className="mb-4">
        <SearchBar />
      </div>
      {navLinks.map(link => (
        <Link
          key={link.text}
          href={link.href}
          className="flex items-center space-x-4 p-2 rounded hover:bg-blue-800"
          onClick={onClose}>
          {link.icon}
          <span>{link.text}</span>
        </Link>
      ))}
      <hr className="border-gray-500" />
      <div className="pt-4">{isLoggedIn ? <UserInfo /> : <AuthButtons />}</div>
    </div>
  </div>
);

const Header = () => {
  const isLoggedIn = false;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#1C33FF] text-white fixed top-0 left-0 z-50 w-full">
      <div className="flex items-center justify-between h-[110px] max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="hidden md:flex flex-grow mx-4">
          <SearchBar />
        </div>
        <DesktopNav isLoggedIn={isLoggedIn} />
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(true)}>
            <MenuOutlined style={{fontSize: '24px'}} />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <MobileNav
          isLoggedIn={isLoggedIn}
          onClose={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
