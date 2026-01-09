import { useState } from 'react'
import { useRouter } from 'next/router'
import { useCart } from '../context/CartContext'

export default function Checkout(){
  const router = useRouter()
  const { items } = useCart()

  const [currency, setCurrency] = useState('INR')
  const [email, setEmail] = useState('')
  const [playerIGN, setPlayerIGN] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if(!playerIGN || playerIGN.trim().length < 2){
      alert('Please enter the player IGN before proceeding.')
      return
    }
    // validate ranks in cart: only one rank allowed, prevent duplicate purchase or downgrade
    const ranksInCart = items.filter((it:any)=> it.category === 'ranks')
    if(ranksInCart.length > 1){
      alert('Only one rank can be purchased at a time. Remove extra ranks from your cart.')
      return
    }

    // load purchases from localStorage
    const raw = typeof window !== 'undefined' ? localStorage.getItem('mineclash_purchases') : null
    const purchases = raw ? JSON.parse(raw) : {}
    const existing = purchases[playerIGN] || { rank: null, coins: 0 }

    const RANK_ORDER = ['BARON','VETERAN','MONARCH','EMPEROR','CRASH','CRASH+','CUSTOM RANK']
    const rankIndex = (name:string|null) => name ? RANK_ORDER.indexOf(name.toUpperCase()) : -1

    if(ranksInCart.length === 1){
      const newRankName = ranksInCart[0].name
      const existingRankName = existing.rank || null
      const existingIdx = rankIndex(existingRankName)
      const newIdx = rankIndex(newRankName)

      if(existingRankName && existingRankName.toUpperCase() === newRankName.toUpperCase()){
        alert(`Player ${playerIGN} already owns the rank ${newRankName}.`) 
        return
      }

      if(existingRankName && newIdx <= existingIdx){
        alert(`Cannot purchase a lower or equal rank. Player already has ${existingRankName}.`) 
        return
      }
    }

    setLoading(true)

    // compute total in INR (use priceINR when available, otherwise convert USD -> INR)
    const usdToInr = 82.5
    const totalINR = items.reduce((sum, it:any) => {
      const unit = typeof it.priceINR === 'number' ? it.priceINR : (typeof it.priceUSD === 'number' ? Math.round(it.priceUSD * usdToInr) : 0)
      return sum + unit * it.qty
    }, 0)

    // Redirect to UPI payment page with query params
    router.push(`/checkout/upi?ign=${encodeURIComponent(playerIGN)}&amountINR=${encodeURIComponent(String(totalINR))}&email=${encodeURIComponent(email)}`)
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="bg-white rounded shadow p-6">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Currency</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full border rounded px-3 py-2">
            <option value="INR">INR (UPI)</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="you@example.com" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Player IGN</label>
          <input type="text" value={playerIGN} onChange={(e) => setPlayerIGN(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="PlayerInGameName" />
        </div>
        <button 
          onClick={handleCheckout} 
          disabled={loading}
          className="w-full px-4 py-2 bg-yellow-400 text-gray-900 font-bold rounded disabled:opacity-50 hover:bg-yellow-500"
        >
          {loading ? 'Processing...' : 'Proceed to UPI'}
        </button>
        <p className="text-xs text-gray-500 mt-4">⚠️ We currently support UPI payments only (INR).</p>
      </div>
    </div>
  )
}
