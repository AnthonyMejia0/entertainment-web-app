import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Entertainment App',
  description:
    'A web application for browsing and discovering movies and TV shows.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full min-h-dvh antialiased`}
    >
      <body className="h-dvh bg-blue-950 overflow-hidden">{children}</body>
    </html>
  );
}
