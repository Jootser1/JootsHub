import { Providers } from "./providers";
import "@/styles/globals.css";
import { ReactNode } from "react";
import { UserSocketProvider } from "./sockets/user/userSocketContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>

          <Providers>
          <UserSocketProvider>
            {children}
            </UserSocketProvider>
            </Providers>

      </body>
    </html>
  );
}

