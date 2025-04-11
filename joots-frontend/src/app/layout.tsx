import { Providers } from "./providers";
import "@/styles/globals.css";
import { ReactNode } from "react";
import { GlobalUserSocketProvider } from "./sockets/user/GlobalUserSocketProvider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          <GlobalUserSocketProvider>
            {children}
          </GlobalUserSocketProvider>
        </Providers>
      </body>
    </html>
  );
}

