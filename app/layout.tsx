import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';
import Header from './components/client/Header';
import { Toaster } from '@/components/ui/sonner';
import Footer from './components/server/Footer';

export const metadata: Metadata = {
  title: 'Glow Niva | Premium Skincare for Glowing Skin',
  description:
    'Glow Niva offers premium face serums, creams, and skincare products designed for girls who love glowing skin. Shop now!',
  keywords: [
    'Glow Niva',
    'skincare',
    'face serum',
    'face cream',
    'glowing skin',
    'girls cosmetics',
  ],
  openGraph: {
    title: 'Glow Niva | Premium Skincare',
    description:
      'Best serums and creams for glowing skin. Discover Glow Niva now.',
    url: 'https://glowniva.com',
    siteName: 'Glow Niva',
    images: [
      {
        url: 'https://glowniva.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Glow Niva skincare product',
      },
    ],
    locale: 'bn_bd',
    type: 'website',
  },
  metadataBase: new URL('https://glowniva.com'),
  alternates: {
    canonical: '/',
  },
};

const raleway = Raleway({
  weight: '400',
  subsets: ['cyrillic'],
  style: 'normal',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${raleway.className} `}>
        <div>
          <Header />
          <div className='max-w-[100%] mx-auto'>{children}</div>
        </div>

        <Footer/>

        <Toaster position="top-left" richColors />
      </body>
    </html>
  );
}
