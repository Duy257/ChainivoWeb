"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import navigationService from "@/services/NavigationService";

const NavigationInjector = () => {
  const router = useRouter();

  useEffect(() => {
    navigationService.setRouter(router);
  }, [router]);

  return null;
};

export default NavigationInjector;
