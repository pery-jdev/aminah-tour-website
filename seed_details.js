const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function seedDetails() {
  console.log("Seeding package details...");

  const updates = [
    {
      slug: 'umrah-reguler-9-hari',
      airline: 'Saudi Airlines',
      departure_date: '2024-11-15',
      price_quad: 'Rp 29.750.000',
      price_triple: 'Rp 31.250.000',
      price_double: 'Rp 33.650.000',
      included_facilities: "Tiket Pesawat PP Kelas Ekonomi\nVisa Umrah\nHotel Makkah: Le Meridien Towers / Setaraf (Bintang 5)\nHotel Madinah: Taiba Front / Setaraf (Bintang 5)\nMakan 3x sehari menu Indonesia\nTransportasi Bus VIP Full AC\nMuthawif / Pembimbing Ibadah Berpengalaman\nAir Zam-zam 5 Liter (Jika diizinkan maskapai)\nPerlengkapan Umrah Eksklusif (Koper, Tas, Ihram/Mukena)",
      excluded_facilities: "Paspor & Suntik Meningitis\nPengeluaran Pribadi (Laundry, Telp, dll)\nKelebihan Bagasi\nBiaya Mahram (Bila diperlukan)"
    },
    {
      slug: 'umrah-plus-turki-12-hari',
      airline: 'Turkish Airlines',
      departure_date: '2024-12-05',
      price_quad: 'Rp 38.500.000',
      price_triple: 'Rp 40.000.000',
      price_double: 'Rp 42.500.000',
      included_facilities: "Tiket Pesawat PP Kelas Ekonomi\nVisa Umrah & Visa Turki\nHotel Bintang 5 di Makkah, Madinah, Istanbul, dan Cappadocia\nMakan 3x sehari\nCity Tour Turki (Cappadocia, Bosphorus Cruise)\nMuthawif & Guide Lokal Berbahasa Indonesia",
      excluded_facilities: "Paspor\nPengeluaran Pribadi\nHot Air Balloon (Opsional)"
    },
    {
      slug: 'umrah-spesial-ramadhan',
      airline: 'Garuda Indonesia',
      departure_date: '2025-03-01',
      price_quad: 'Rp 42.000.000',
      price_triple: 'Rp 45.000.000',
      price_double: 'Rp 48.000.000',
      included_facilities: "Tiket PP\nVisa Umrah Ramadhan\nHotel Berbuka & Sahur\nBus AC\nMuthawif Pembimbing",
      excluded_facilities: "Paspor\nPengeluaran Pribadi"
    }
  ];

  for (const update of updates) {
    const { slug, ...fields } = update;
    const { error } = await supabase
      .from('packages')
      .update(fields)
      .eq('slug', slug);

    if (error) {
      console.error(`Error updating ${slug}:`, error.message);
    } else {
      console.log(`Updated ${slug}`);
    }
  }

  console.log("Seeding complete!");
}

seedDetails();
