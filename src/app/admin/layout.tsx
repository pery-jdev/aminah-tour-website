"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Building2, Image as ImageIcon, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Paket Umroh", href: "/admin/packages", icon: Package },
    { name: "Fasilitas", href: "/admin/facilities", icon: Building2 },
    { name: "Galeri", href: "/admin/galleries", icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white md:flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-[#111] border-r border-[#222]">
        <div className="p-6 border-b border-[#222]">
          <h2 className="text-xl font-bold text-white">CMS Admin</h2>
          <p className="text-sm text-gray-400">Aminah Tour Jepara</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#d4af37]/20 text-[#d4af37]"
                    : "text-gray-400 hover:bg-[#222] hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-[#222]">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-[#222] hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Ke Website
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0 overflow-auto">
        {/* Mobile Header */}
        <header className="md:hidden bg-[#111] border-b border-[#222] px-4 py-3 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 className="font-bold text-white">CMS Admin</h2>
          </div>
          <Link href="/" className="text-sm text-gray-400 hover:text-white flex items-center gap-1">
            <LogOut className="w-4 h-4" />
            Web
          </Link>
        </header>

        <div className="flex-1 p-4 md:p-8">
          {children}
        </div>
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#111] border-t border-[#222] flex justify-around p-2 z-20 pb-safe">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center p-2 rounded-lg min-w-[64px] ${
                isActive ? "text-[#d4af37]" : "text-gray-400"
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium leading-none">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
