import { useEffect, useState } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartProvider } from '../context/CartContext';
import { CurrencyProvider } from '../context/CurrencyContext';

export default function App({ Component, pageProps }: AppProps) {
  const [bypass, setBypass] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBypass(localStorage.getItem('mineclash_bypass') === 'true');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <link rel="icon" href="/images/top%20logo.png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/images/top%20logo.png" />
      </Head>
      <CurrencyProvider>
        <CartProvider>
          <Header />
          <Footer />
        </CartProvider>
      </CurrencyProvider>
    </div>
  );
}
