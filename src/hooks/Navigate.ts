// Navigation Controller for Next.js (Complete Solution)
'use client';

import {useRouter, usePathname} from 'next/navigation';

/**
 * Simple Navigation Hook for Next.js
 * Easy to use navigation utilities
 */
export function useNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  // Navigate to a new page
  const navigateTo = (
    path: string,
    replace: boolean = false,
    params?: Record<string, string>,
  ) => {
    let fullPath = path;
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      fullPath = queryString ? `${path}?${queryString}` : path;
    }

    if (replace) {
      router.replace(fullPath);
    } else {
      router.push(fullPath);
    }
  };

  // Go back in history
  const goBack = () => {
    router.back();
  };

  // Refresh current page
  const refresh = () => {
    router.refresh();
  };

  // Get current path
  const getCurrentPath = () => {
    return pathname;
  };

  // Navigate with query parameters
  const navigateWithQuery = (
    path: string,
    query: Record<string, string>,
    replace: boolean = false,
  ) => {
    const queryString = new URLSearchParams(query).toString();
    const fullPath = queryString ? `${path}?${queryString}` : path;

    if (replace) {
      router.replace(fullPath);
    } else {
      router.push(fullPath);
    }
  };

  return {
    navigateTo,
    goBack,
    refresh,
    getCurrentPath,
    navigateWithQuery,
  };
}
