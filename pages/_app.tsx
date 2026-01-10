import Maintenance from './maintenance'
import { useEffect, useState } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { CartProvider } from '../context/CartContext'
import { CurrencyProvider } from '../context/CurrencyContext'

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
          <main className="flex-1 container mx-auto px-4 py-8">
            {bypass ? <Component {...pageProps} /> : <Maintenance />}
          </main>
          <Footer />
        </CartProvider>
      </CurrencyProvider>
    </div>
  )
}
