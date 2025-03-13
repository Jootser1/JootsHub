"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
}
