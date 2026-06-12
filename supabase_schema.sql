-- Run this in your Supabase SQL Editor

-- 1. Create Packages Table
CREATE TABLE IF NOT EXISTS public.packages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    duration_days INTEGER,
    image_url TEXT,
    slug TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Facilities Table
CREATE TABLE IF NOT EXISTS public.facilities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Galleries Table
CREATE TABLE IF NOT EXISTS public.galleries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    image_url TEXT,
    video_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Disable Row Level Security temporarily to allow simple CRUD
ALTER TABLE public.packages DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.facilities DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.galleries DISABLE ROW LEVEL SECURITY;

-- Create basic storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to the images bucket
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'images' );

-- Allow public uploads to the images bucket
DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
CREATE POLICY "Public Upload" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'images' );

-- --------------------------------------------------------
-- UPDATE SCHEMA (ADD NEW COLUMNS)
-- --------------------------------------------------------
ALTER TABLE public.packages
ADD COLUMN IF NOT EXISTS departure_date DATE,
ADD COLUMN IF NOT EXISTS airline TEXT,
ADD COLUMN IF NOT EXISTS price_quad TEXT,
ADD COLUMN IF NOT EXISTS price_triple TEXT,
ADD COLUMN IF NOT EXISTS price_double TEXT,
ADD COLUMN IF NOT EXISTS included_facilities TEXT,
ADD COLUMN IF NOT EXISTS excluded_facilities TEXT;

-- --------------------------------------------------------
-- DUMMY DATA INSERTS
-- --------------------------------------------------------

INSERT INTO public.packages (
  title, description, duration_days, image_url, slug, 
  departure_date, airline, price_quad, price_triple, price_double, 
  included_facilities, excluded_facilities
)
VALUES 
  (
    'Umrah Reguler 9 Hari', 
    'Perjalanan spiritual 9 hari penuh makna dengan fasilitas lengkap dan pembimbing berpengalaman.', 
    9, 
    'https://images.unsplash.com/photo-1565552643982-2d174eb6a506?w=1000&q=80', 
    'umrah-reguler-9-hari',
    '2024-11-15', 'Saudi Airlines', 'Rp 29.750.000', 'Rp 31.250.000', 'Rp 33.650.000',
    'Tiket Pesawat PP Kelas Ekonomi\nVisa Umrah\nHotel Makkah: Le Meridien Towers / Setaraf (Bintang 5)\nHotel Madinah: Taiba Front / Setaraf (Bintang 5)\nMakan 3x sehari menu Indonesia\nTransportasi Bus VIP Full AC\nMuthawif / Pembimbing Ibadah Berpengalaman\nAir Zam-zam 5 Liter (Jika diizinkan maskapai)\nPerlengkapan Umrah Eksklusif (Koper, Tas, Ihram/Mukena)',
    'Paspor & Suntik Meningitis\nPengeluaran Pribadi (Laundry, Telp, dll)\nKelebihan Bagasi\nBiaya Mahram (Bila diperlukan)'
  ),
  (
    'Umrah Plus Turki 12 Hari', 
    'Ibadah umrah dilanjutkan dengan menyusuri jejak sejarah Islam di Turki (Cappadocia & Istanbul).', 
    12, 
    'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1000&q=80', 
    'umrah-plus-turki-12-hari',
    '2024-12-05', 'Turkish Airlines', 'Rp 38.500.000', 'Rp 40.000.000', 'Rp 42.500.000',
    'Tiket Pesawat PP Kelas Ekonomi\nVisa Umrah & Visa Turki\nHotel Bintang 5 di Makkah, Madinah, Istanbul, dan Cappadocia\nMakan 3x sehari\nCity Tour Turki (Cappadocia, Bosphorus Cruise)\nMuthawif & Guide Lokal Berbahasa Indonesia',
    'Paspor & Suntik Meningitis\nPengeluaran Pribadi\nHot Air Balloon (Opsional)\nKelebihan Bagasi'
  ),
  (
    'Umrah Plus Dubai 10 Hari', 
    'Nikmati perjalanan ibadah yang dipadukan dengan kemewahan dan keajaiban modern di Dubai.', 
    10, 
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1000&q=80', 
    'umrah-plus-dubai-10-hari',
    '2025-01-20', 'Emirates', 'Rp 35.000.000', 'Rp 37.500.000', 'Rp 39.800.000',
    'Tiket Pesawat PP Kelas Ekonomi\nVisa Umrah & Visa Dubai\nHotel Bintang 5 di Makkah & Madinah\nHotel Bintang 4 di Dubai\nCity Tour Dubai (Burj Khalifa, Desert Safari)\nMakan 3x sehari\nTransportasi Bus AC',
    'Paspor & Suntik Meningitis\nPengeluaran Pribadi\nTiket Masuk Wahana Opsional'
  ),
  (
    'Umrah Spesial Ramadhan 15 Hari', 
    'Raih pahala setara haji bersama Rasulullah dengan beribadah di bulan suci Ramadhan, menikmati malam Lailatul Qadar.', 
    15, 
    'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=1000&q=80', 
    'umrah-spesial-ramadhan',
    '2025-03-01', 'Garuda Indonesia', 'Rp 42.000.000', 'Rp 45.000.000', 'Rp 48.000.000',
    'Tiket PP Kelas Ekonomi\nVisa Umrah Ramadhan\nHotel Bintang 5 (Termasuk Menu Buka & Sahur)\nBus Full AC\nMuthawif Pembimbing Ibadah\nAir Zam-zam 5 Liter\nPerlengkapan Umrah',
    'Paspor & Suntik Meningitis\nPengeluaran Pribadi\nKelebihan Bagasi'
  ),
  (
    'Umrah VIP Plus Aqsa 14 Hari', 
    'Perjalanan suci merangkai tiga masjid utama: Masjidil Haram, Masjid Nabawi, dan Masjidil Aqsa di Palestina.', 
    14, 
    'https://images.unsplash.com/photo-1563223771-5fe4bf509aeb?w=1000&q=80', 
    'umrah-vip-plus-aqsa-14-hari',
    '2025-04-10', 'Qatar Airways', 'Rp 48.500.000', 'Rp 51.000.000', 'Rp 55.000.000',
    'Tiket PP VIP\nVisa Umrah & Visa Aqsa\nHotel Bintang 5 Premium di Semua Kota\nMakan Full Board (Nusantara & Middle East)\nBus Eksekutif\nTour Guide Tersertifikasi\nAsuransi Perjalanan',
    'Paspor\nPengeluaran Pribadi\nOleh-oleh'
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration_days = EXCLUDED.duration_days,
  image_url = EXCLUDED.image_url,
  departure_date = EXCLUDED.departure_date,
  airline = EXCLUDED.airline,
  price_quad = EXCLUDED.price_quad,
  price_triple = EXCLUDED.price_triple,
  price_double = EXCLUDED.price_double,
  included_facilities = EXCLUDED.included_facilities,
  excluded_facilities = EXCLUDED.excluded_facilities;

-- Kosongkan fasilitas dan galeri sebelum diisi agar tidak dobel (karena tidak ada unique slug)
DELETE FROM public.facilities;
DELETE FROM public.galleries;

INSERT INTO public.facilities (title, description, image_url)
VALUES 
  ('Akomodasi Bintang 5', 'Beristirahat di hotel berkelas dunia dengan jarak jalan kaki dari pelataran Masjid.', 'https://images.unsplash.com/photo-1542314831-c6a4d14d8c53?w=1000&q=80'),
  ('Cita Rasa Nusantara', 'Layanan katering prasmanan dengan menu khas Indonesia yang lezat setiap hari.', 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1000&q=80'),
  ('Transportasi Eksklusif', 'Perjalanan yang mulus dengan Bus VIP Full AC selama ziarah dan perpindahan kota.', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1000&q=80'),
  ('Muthawif Berpengalaman', 'Dibimbing langsung oleh muthawif bersertifikat dan sangat memahami tata cara ibadah.', 'https://images.unsplash.com/photo-1584269600519-112d0831ea21?w=1000&q=80'),
  ('Perlengkapan Premium', 'Mendapatkan koper eksklusif, tas paspor, mukena/kain ihram, dan seragam batik.', 'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=1000&q=80');

INSERT INTO public.galleries (title, image_url)
VALUES 
  ('Makkah Al-Mukarramah', 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=1000&q=80'),
  ('Madinah Al-Munawwarah', 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=1000&q=80'),
  ('Jamaah di Masjidil Haram', 'https://images.unsplash.com/photo-1565552643982-2d64df196728?w=1000&q=80'),
  ('Menara Jam (Clock Tower)', 'https://images.unsplash.com/photo-1590393275627-0c48e89f816c?w=1000&q=80'),
  ('Kereta Cepat Haramain', 'https://images.unsplash.com/photo-1579208032588-2cb906d482c3?w=1000&q=80');
