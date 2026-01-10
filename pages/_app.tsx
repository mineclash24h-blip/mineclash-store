import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Maintenance from './maintenance'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { CartProvider } from '../context/CartContext'
import { CurrencyProvider } from '../context/CurrencyContext'

export default function App({ Component, pageProps }: AppProps) {
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
            <Maintenance />
          </main>
          <Footer />
        </CartProvider>
      </CurrencyProvider>
    </div>
  )
}
