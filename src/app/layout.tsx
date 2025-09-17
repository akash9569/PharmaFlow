import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/cart-context';
import { AuthProvider } from '@/context/auth-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Statistics } from '@/components/statistics';
import { ClientReviews } from '@/components/client-reviews';
import { Chatbot } from '@/components/chatbot';

export const metadata: Metadata = {
  title: 'PharmaFlow',
  description: 'Your trusted online pharmacy for all your health needs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased h-full bg-background')}>
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <ClientReviews />
              <Statistics />
              <Footer />
            </div>
            <Chatbot />
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
