import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import '../globals.css';
import { Toaster } from '@/components/ui/sonner';
import { defualtValue } from '@/constants';
import Header from '../components/client/Header';
// import Footer from '../components/server/Footer';
const { siteName = 'Glow niba', siteUrl } = defualtValue;
export const metadata: Metadata = {
  title: `${siteName}| Premium Skincare for Glowing Skin`,
  description: `${siteName} offers premium face serums, creams, and skincare products designed for girls who love glowing skin. Shop now!`,
  keywords: [
    siteName,
    'skincare',
    'face serum',
    'face cream',
    'glowing skin',
    'girls cosmetics',
  ],
  openGraph: {
    title: `${siteName} | Premium Skincare`,
    description:
      'Best serums and creams for glowing skin. Discover Glow Niva now.',
    url: siteUrl,
    siteName: siteName,
    images: [
      {
        url: siteUrl,
        width: 1200,
        height: 630,
        alt: `${siteName} skincare product`,
      },
    ],
    locale: 'bn_bd',
    type: 'website',
  },
  metadataBase: new URL(siteUrl),
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
    <html>
      <body className={` ${raleway.className} `}>
        <div>
          <div className="mb-10">
            <Header />
          </div>
          <div className="max-w-[100%] mx-auto">{children}</div>
        </div>
        <Toaster position="top-left" richColors />
      </body>
    </html>
  );
}
