import type { Metadata } from 'next';
import { Playfair_Display, Poppins } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'KP Kurtie Points | Elegant & Trendy Kurties',
  description: 'Premium, comfortable, and affordable short kurties for girls and women. Browse our offline catalog today.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'KP Kurtie Points',
  },
  icons: {
    icon: [
      { rel: 'icon', url: '/icon-192x192.png' },
      { rel: 'icon', url: '/icon-512x512.png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
};

export const viewport = {
  themeColor: '#881337',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  viewportFit: 'cover',
};

import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PWARegister from '@/components/PWARegister';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${playfair.variable} ${poppins.variable} antialiased bg-[#fdf2f8] text-[#1c1917]`}>
        <AuthProvider>
          <PWARegister />
          <div className="flex flex-col min-h-screen">
            <AnnouncementBar />
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
