import '@ant-design/v5-patch-for-react-19';

import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import AntdRegistry from '@/lib/AntdRegistry';
import StoreProvider from '@/app/StoreProvider';
import NavigationInjector from '@/components/utility/NavigationInjector';
import {ConfirmProvider} from '@/plugins/ConfirmPlugin';
import {NotificationProvider} from '@/plugins/NotificationPlugin';
import Header from '@/components/layouts/Header';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AntdRegistry>
            <NotificationProvider>
              <ConfirmProvider>
                <NavigationInjector />
                <Header />
                <main className="pt-[110px]">{children}</main>
              </ConfirmProvider>
            </NotificationProvider>
          </AntdRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
