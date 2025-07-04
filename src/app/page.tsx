"use client";

import { Button, Space } from "antd";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="absolute top-8 left-8">
        <Image src="/next.svg" alt="Chainivo Logo" width={150} height={40} />
      </div>

      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">Welcome to Chainivo</h1>
        <p className="text-xl text-gray-600 mb-8">
          The future of decentralized applications.
        </p>
        <Space size="large">
          <Link href="/login">
            <Button type="primary" size="large">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button size="large">Register</Button>
          </Link>
        </Space>
      </div>

      <div className="absolute bottom-8 text-center text-gray-500">
        <p>&copy; 2024 Chainivo. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-gray-800">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-800">
            Terms of Service
          </a>
        </div>
      </div>
    </main>
  );
}
