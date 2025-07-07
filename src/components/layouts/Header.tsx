'use client';

import React, {useEffect, useState} from 'react';
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
import {RootState} from '@/store/store';
import {useSelector} from 'react-redux';
import {StorageContanst} from '@/config/Contanst';
import {getDataToLocalStorage} from '@/utils/LocalStorage';
import {CustomerAction} from '@/api/actions/CustomerAction';

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

// Helper function to get rank name based on rank number
const getRankName = (rank: number) => {
  switch (rank) {
    case 1:
      return 'VIP';
    case 2:
      return 'Member';
    default:
      return 'Member';
  }
};

// Helper function to mask phone number
const maskPhone = (phone: string) => {
  if (!phone || phone.length < 6) return 'N/A';
  return `${phone.slice(0, 2)}***${phone.slice(-3)}`;
};

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

const UserInfo = ({customerData}: {customerData: any}) => {
  return (
    <div className="flex items-center space-x-2">
      <Avatar
        src={
          customerData?.Avatar ||
          `https://i.pravatar.cc/150?u=${customerData?.Id || 'default'}`
        }
      />
      <div className="hidden xl:block">
        <div>{customerData?.Name || 'Người dùng'}</div>
        <div className="text-xs">
          <span>{getRankName(customerData?.Rank || 2)}</span>
          <span> • </span>
          <span>
            {maskPhone(customerData?.Mobile || customerData?.Phone || '')}
          </span>
        </div>
      </div>
    </div>
  );
};

const AuthButtons = () => (
  <div className="flex items-center space-x-4">
    <Link href="/auth/register" className="font-semibold hover:text-gray-200">
      Đăng Ký
    </Link>
    <div className="border-l h-4 border-gray-400" />
    <Link href="/auth/login" className="font-semibold hover:text-gray-200">
      Đăng Nhập
    </Link>
  </div>
);

const DesktopNav = ({
  isLoggedIn,
  customerData,
}: {
  isLoggedIn: boolean;
  customerData: any;
}) => (
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
    {isLoggedIn ? (
      <Link href="/profile">
        <UserInfo customerData={customerData} />
      </Link>
    ) : (
      <AuthButtons />
    )}
  </div>
);

const MobileNav = ({
  isLoggedIn,
  customerData,
  onClose,
}: {
  isLoggedIn: boolean;
  customerData: any;
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
      <div className="pt-4">
        {isLoggedIn ? (
          <UserInfo customerData={customerData} />
        ) : (
          <AuthButtons />
        )}
      </div>
    </div>
  </div>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get customer data from Redux store
  const {data} = useSelector((state: RootState) => state.customer);

  // Derive login status from Redux state
  const isLoggedIn = Boolean(data && data.Id);

  const handleGetInforCustomer = async () => {
    const res = await CustomerAction.getInfor();
    if (res.code === 200) {
      console.log('Customer info fetched:', res.data);
    }
  };

  useEffect(() => {
    const custumerId = getDataToLocalStorage(StorageContanst.CustomerId);
    if (custumerId && !data) {
      handleGetInforCustomer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="bg-[#1C33FF] text-white fixed top-0 left-0 z-50 w-full">
      <div className="flex items-center justify-between h-[110px] max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="hidden md:flex flex-grow mx-4">
          <SearchBar />
        </div>
        <DesktopNav isLoggedIn={isLoggedIn} customerData={data} />
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(true)}>
            <MenuOutlined style={{fontSize: '24px'}} />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <MobileNav
          isLoggedIn={isLoggedIn}
          customerData={data}
          onClose={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
