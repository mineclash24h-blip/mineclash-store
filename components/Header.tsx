import Link from 'next/link'
import Logo from './Logo'
import CartIcon from './CartIcon'
import { useCart } from '../context/CartContext'
import { useCurrency } from '../context/CurrencyContext'

export default function Header(){
  const { currency, setCurrency } = useCurrency()
  const { count } = useCart()

  return (
    <header className="hero-banner">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Home">
          <img src="/images/logo.png" alt="MineClash" className="h-16 object-contain" />
        </Link>

        <nav className="flex items-center space-x-6" aria-label="Main navigation">
          <Link href="/shop" className="text-white hover:text-blue-200">Shop</Link>
          <Link href="/cart" className="text-white hover:text-blue-200 flex items-center gap-2"><CartIcon count={count} /> <span className="sr-only">Cart</span></Link>
          <select value={currency} onChange={(e) => setCurrency(e.target.value as 'USD' | 'INR')} className="border border-blue-400 bg-blue-700 text-white rounded px-3 py-1">
            <option value="USD">USD ($)</option>
            <option value="INR">INR (₹)</option>
          </select>
        </nav>
      </div>

    </header>
  )
}
