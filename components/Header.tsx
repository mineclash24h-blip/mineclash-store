import Link from 'next/link'
import Logo from './Logo'
import CartIcon from './CartIcon'
import { useCart } from '../context/CartContext'
import { useEffect, useState } from 'react'

export default function Header(){
  const { count } = useCart()
  const [deploymentTime, setDeploymentTime] = useState('')

  useEffect(() => {
    fetch('/version.json')
      .then(r => r.json())
      .then(data => {
        const time = new Date(data.timestamp).toLocaleString()
        setDeploymentTime(time)
      })
      .catch(() => setDeploymentTime('Loading...'))
  }, [])

  return (
    <header className="hero-banner">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Home">
          <img src="/images/logo.png" alt="MineClash" className="h-16 object-contain" />
        </Link>

        <nav className="flex items-center space-x-6" aria-label="Main navigation">
          <Link href="/shop" className="text-white hover:text-blue-200">Shop</Link>
          <Link href="/cart" className="text-white hover:text-blue-200 flex items-center gap-2"><CartIcon count={count} /> <span className="sr-only">Cart</span></Link>
          <span className="text-xs text-blue-100" title={`Last updated: ${deploymentTime}`}>
            {deploymentTime ? `Updated: ${deploymentTime.split(',')[0]}` : ''}
          </span>
        </nav>
      </div>

    </header>
  )
}
