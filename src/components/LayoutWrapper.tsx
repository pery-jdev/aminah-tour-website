"use client";

import { usePathname } from "next/navigation";
import { Navbar1 } from "@/components/ui/navbar-1";
import Footer from "@/components/Footer";
import GlobalSpotlight from "@/components/GlobalSpotlight";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdmin && <GlobalSpotlight />}
      {!isAdmin && <Navbar1 />}
      <main className={isAdmin ? "" : "flex-grow"}>
        {children}
      </main>
      {!isAdmin && <Footer />}
    </>
  );
}
