'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';
  const user = session?.user;

  const logout = async () => {
    try {
      // Clear local storage tokens
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('timeRefresh');
      
      // Sign out from NextAuth
      await signOut({ redirect: false });
      
      // Redirect to login page
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getAccessToken = () => {
    return user?.accessToken || localStorage.getItem('accessToken');
  };

  const getRefreshToken = () => {
    return user?.refreshToken || localStorage.getItem('refreshToken');
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    logout,
    getAccessToken,
    getRefreshToken,
  };
};
