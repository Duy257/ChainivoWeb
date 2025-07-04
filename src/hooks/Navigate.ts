// Navigation Controller for Next.js (Complete Solution)
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

/**
 * Simple Navigation Hook for Next.js
 * Easy to use navigation utilities
 */
export function useNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Navigate to a new page
  const navigate = (path: string, replace: boolean = false) => {
    if (replace) {
      router.replace(path);
    } else {
      router.push(path);
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

  // Get all query parameters as object
  const getQueryParams = () => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  };

  // Get specific query parameter
  const getQueryParam = (key: string) => {
    return searchParams.get(key);
  };

  // Navigate with query parameters
  const navigateWithQuery = (
    path: string,
    query: Record<string, string>,
    replace: boolean = false
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
    navigate,
    goBack,
    refresh,
    getCurrentPath,
    getQueryParams,
    getQueryParam,
    navigateWithQuery,
  };
}
