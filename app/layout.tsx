import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dream XI — Retro World Cup Legends Football Manager',
  description: 'Randomly roll national teams, build your dream squad of historic football legends, select tactical formations, and simulate knockout tournaments.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`} suppressHydrationWarning>
      <body className="bg-[#0a0c0f] text-[#f0f0f0] min-h-screen antialiased select-none selection:bg-[#e8ff3b] selection:text-black" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
