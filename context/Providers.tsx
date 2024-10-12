"use client";

import { ReactNode } from "react";
import { OKRProvider } from "@/context/OKRContext";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <OKRProvider>{children}</OKRProvider>;
}
