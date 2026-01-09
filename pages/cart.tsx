import { useState } from 'react'
import { useRouter } from 'next/router'
import { useCart } from '../context/CartContext'

export default function Cart(){
  const router = useRouter()
  const { items, remove, clear } = useCart()
  const [currency, setCurrency] = useState('USD')

  const total = items.reduce((s,i)=>{
    const price = currency === 'INR' ? (i.priceINR || 0) : (i.priceUSD || 0)
    return s + price * i.qty
  }, 0)

  return (
    <main className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="mb-4">
        <label className="mr-2">Currency</label>
        <select value={currency} onChange={(e)=>setCurrency(e.target.value)} className="border rounded px-2 py-1">
          <option value="USD">USD</option>
          <option value="INR">INR</option>
        </select>
      </div>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map(i=> (
            <div key={i.id} className="flex items-center justify-between bg-white p-4 rounded shadow">
              <div>
                <div className="font-semibold">{i.name}</div>
                <div className="text-sm text-gray-500">Qty: {i.qty}</div>
              </div>
              <div className="text-right">
                <div className="font-bold">{currency === 'INR' ? '₹' : '$'}{(currency==='INR'? (i.priceINR||0) : (i.priceUSD||0)) * i.qty}</div>
                <button onClick={()=>remove(i.id)} className="text-sm text-red-600 mt-2">Remove</button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between">
            <div className="font-bold">Total</div>
            <div className="font-bold">{currency === 'INR' ? '₹' : '$'}{currency === 'INR' ? Math.round(total) : total.toFixed(2)}</div>
          </div>

          <div className="flex gap-3">
            <button onClick={()=>clear()} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Clear</button>
            <button onClick={()=>router.push('/checkout')} className="px-4 py-2 bg-yellow-400 text-gray-900 font-bold rounded hover:bg-yellow-500">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </main>
  )
}
