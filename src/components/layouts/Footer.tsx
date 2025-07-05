import React from 'react';
import Image from 'next/image';
import {Input, Button} from 'antd';
import {
  YoutubeOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  TikTokOutlined,
} from '@ant-design/icons';

const menuLinks = [
  {href: '#', text: 'Trang chủ'},
  {href: '#', text: 'Tin tức'},
  {href: '#', text: 'Cộng đồng'},
  {href: '#', text: 'Điều khoản sử dụng'},
  {href: '#', text: 'Tuyển dụng'},
  {href: '#', text: 'Liên hệ'},
];

const socialLinks = [
  {name: 'YouTube', href: '#', icon: <YoutubeOutlined className="text-xl" />},
  {name: 'Facebook', href: '#', icon: <FacebookOutlined className="text-xl" />},
  {name: 'Twitter', href: '#', icon: <TwitterOutlined className="text-xl" />},
  {
    name: 'Instagram',
    href: '#',
    icon: <InstagramOutlined className="text-xl" />,
  },
  {name: 'TikTok', href: '#', icon: <TikTokOutlined className="text-xl" />},
];

const Footer: React.FC = () => {
  const halfLength = Math.ceil(menuLinks.length / 2);
  const menuColumn1 = menuLinks.slice(0, halfLength);
  const menuColumn2 = menuLinks.slice(halfLength);

  return (
    <footer className="w-full bg-white py-8 text-gray-800 mt-60">
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-start">
          {/* Logo */}
          <div className="flex flex-col items-start gap-4 sm:flex-row">
            <Image
              src="/logo-text.svg"
              alt="Chainivo Logo"
              width={200}
              height={50}
            />
            {/* Description */}
            <div className="text-sm text-gray-600">
              Ứng dụng thương mại điện tử cho phép doanh nghiệp và cửa hàng tự
              xây dựng và quản lý chương trình affiliate, chủ động thiết lập cơ
              chế hoa hồng, mở rộng kênh bán hàng qua cộng tác viên, thúc đẩy
              doanh thu nhờ mạng lưới đối tác linh hoạt.
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Menu</h3>
            <div className="grid grid-cols-2 gap-4">
              <ul className="space-y-2">
                {menuColumn1.map(link => (
                  <li key={link.text}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-blue-600">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {menuColumn2.map(link => (
                  <li key={link.text}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-blue-600">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex w-full flex-col gap-4 md:w-[280px]">
            <h3 className="text-lg font-bold">Đăng ký liên hệ</h3>
            <Input placeholder="Nhập email của bạn" />
            <Button
              type="primary"
              className="w-min"
              style={{
                background:
                  'linear-gradient(94.87deg, #111F99 0%, rgba(28, 51, 255, 0.9) 100%)',
                color: 'white',
              }}>
              Đăng ký
            </Button>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t pt-8 text-sm text-gray-500 md:flex-row">
          <p>© 2025. All rights reserved by CHAINIVO JSC COMPANY</p>
          <div className="mt-4 flex items-center space-x-4 md:mt-0">
            <span>Theo dõi chúng tôi:</span>
            {socialLinks.map(social => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="hover:text-blue-600">
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
