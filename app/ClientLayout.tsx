"use client";

import { ReactNode } from "react";
import ThemeProvider from "@/components/ThemeProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import { DataProvider } from "@/providers/DataProvider";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <DataProvider>
        <CustomCursor />
        {children}
      </DataProvider>
    </ThemeProvider>
  );
}
