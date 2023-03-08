import { PropsWithChildren } from "react";
import { Inter as FontSans } from "@next/font/google";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export function Layout({ children }: PropsWithChildren) {
  return (
    <div
      className={cn(
        "min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50",
        fontSans.variable
      )}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}
