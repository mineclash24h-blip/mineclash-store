import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function ProductCard({product, currency='USD'}:{product:any, currency?:string}){
  const raw = currency === 'INR' ? product.priceINR : product.priceUSD
  const price = typeof raw === 'number' ? (currency === 'INR' ? raw : raw.toFixed(2)) : raw
  const symbol = currency === 'INR' ? '₹' : '$'

  const { add } = useCart()

  const [showDetails, setShowDetails] = useState(false)

  const perks = (product.description || '').split('\n').map(s => s.trim()).filter(Boolean)
  const previewCount = 4

  const addToCart = () => {
    add({ id: product.id, name: product.name, priceUSD: product.priceUSD, priceINR: product.priceINR, qty: 1 })
  }

  const cardClass = product.category === 'ranks'
    ? 'bg-gradient-to-br from-indigo-50 to-indigo-100 border-l-4 border-indigo-400'
    : product.category === 'coins'
      ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-l-4 border-emerald-400'
      : 'bg-white'

  return (
    <>
      <article className={`${cardClass} rounded-lg shadow-md p-3 sm:p-4 flex flex-col hover:shadow-lg transition-shadow`}>
        <div className="product-image h-32 sm:h-44 rounded mb-3 sm:mb-4 overflow-hidden flex items-center justify-center bg-gray-200">
          {product.image ? (
            <img src={product.image + '?v=' + Date.now()} alt={`${product.name} image`} className="w-auto h-auto max-w-full max-h-full" onError={(e) => {e.currentTarget.src = '/images/product-placeholder.svg'}} />
          ) : (
            <img src="/images/product-placeholder.svg" alt={`${product.name} image`} className="w-full h-full object-cover" />
          )}
        </div>
        <h3 className="font-semibold text-base sm:text-lg">{product.name}</h3>

        {perks.length > 0 ? (
          <ul className="text-sm text-gray-700 mt-2 space-y-1">
            {perks.slice(0, previewCount).map((p, i) => <li key={i} className="flex items-start gap-2"><span className="text-yellow-500">•</span><span>{p}</span></li>)}
            {perks.length > previewCount && (
              <li>
                <button onClick={() => setShowDetails(true)} className="mt-2 text-sm text-indigo-600 hover:underline">See more</button>
              </li>
            )}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 mt-1">{product.description}</p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xl font-bold">{symbol}{price}</div>
          <div className="flex items-center gap-3">
            <button onClick={() => addToCart()} className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Add</button>
            <Link href={`/product/${product.id}`} className="text-sm text-blue-600 hover:underline">View</Link>
          </div>
        </div>
      </article>

      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowDetails(false)} />
          <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 p-6 z-10">
            <h4 className="text-xl font-bold mb-4">{product.name} perks</h4>
            <div className="text-sm text-gray-800 space-y-2">
              {perks.map((p,i) => <div key={i} className="flex items-start gap-3"><span className="text-yellow-500">•</span><span>{p}</span></div>)}
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setShowDetails(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
