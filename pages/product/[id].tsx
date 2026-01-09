import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function ProductPage(){
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState<any>(null)
  const [currency, setCurrency] = useState('USD')

  useEffect(()=>{
    if(!id) return
    fetch('/api/products')
      .then(r=>r.json())
      .then((data:any)=>{
        const items = [ ...(data.ranks || []), ...(data.coins || []) ]
        setProduct(items.find((x:any)=>String(x.id)===String(id)))
      })
  },[id])

  if(!product) return <div>Loading...</div>

  const raw = currency === 'INR' ? product.priceINR : product.priceUSD
  const price = typeof raw === 'number' ? (currency === 'INR' ? raw : raw.toFixed(2)) : raw
  const symbol = currency === 'INR' ? '₹' : '$'

  return (
    <main className="container mx-auto px-4">
      <div className="flex justify-end mb-4">
        <label className="mr-2 text-sm">Currency</label>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="border rounded px-2 py-1">
          <option value="USD">USD</option>
          <option value="INR">INR</option>
        </select>
      </div>

      <article className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow overflow-hidden">
          <img src="/images/product-placeholder.svg" alt={`${product.name} image`} className="w-full h-96 object-cover" />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700 mb-4 text-xl font-semibold">{symbol}{price}</p>
          <p className="mb-6">{product.description}</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Add to cart</button>
        </div>
      </article>
    </main>
  )
}
