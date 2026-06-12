import { supabase } from "@/lib/supabase";
import { Package, Building2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export const revalidate = 0; // Disable cache for admin dashboard

export default async function AdminDashboard() {
  const [packagesRes, facilitiesRes, galleriesRes] = await Promise.all([
    supabase.from("packages").select("id", { count: "exact", head: true }),
    supabase.from("facilities").select("id", { count: "exact", head: true }),
    supabase.from("galleries").select("id", { count: "exact", head: true }),
  ]);

  const stats = [
    {
      name: "Total Paket Umroh",
      count: packagesRes.count || 0,
      icon: Package,
      href: "/admin/packages",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      name: "Total Fasilitas",
      count: facilitiesRes.count || 0,
      icon: Building2,
      href: "/admin/facilities",
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    {
      name: "Total Galeri",
      count: galleriesRes.count || 0,
      icon: ImageIcon,
      href: "/admin/galleries",
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-400 mt-1">Selamat datang di panel admin Aminah Tour Jepara.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.name} href={stat.href} className="block">
              <div className="bg-[#111] rounded-xl border border-[#333] p-6 shadow-sm hover:border-[#d4af37] transition-colors group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">{stat.name}</p>
                    <p className="text-3xl font-bold text-white mt-2">{stat.count}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-[#222]`}>
                    <Icon className={`w-6 h-6 text-[#d4af37]`} />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
