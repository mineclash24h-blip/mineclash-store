import ProductCard from '../components/ProductCard'
import { useEffect, useMemo, useState } from 'react'

export default function Shop(){
  const [ranks, setRanks] = useState<any[]>([])
  const [coins, setCoins] = useState<any[]>([])
  const [currency, setCurrency] = useState('USD')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('featured')
  
  useEffect(()=>{
    fetch('/api/products')
      .then(r=>r.json())
      .then((data:any) => {
        console.log('Products loaded:', data)
        setRanks(data.ranks || [])
        setCoins(data.coins || [])
      })
      .catch(e => console.error('Error loading products:', e))
  },[])
  const categories = ['all', 'ranks', 'coins']
  const filteredRanks = useMemo(()=>{
    let out = ranks.slice()
    if(category !== 'all' && category !== 'ranks') return []
    if(query) out = out.filter(p=> p.name.toLowerCase().includes(query.toLowerCase()) || (p.description||'').toLowerCase().includes(query.toLowerCase()))
    if(sort === 'price_asc') out.sort((a,b)=> (a.priceUSD||0)-(b.priceUSD||0))
    if(sort === 'price_desc') out.sort((a,b)=> (b.priceUSD||0)-(a.priceUSD||0))
    return out
  },[ranks, query, sort])

  const filteredCoins = useMemo(()=>{
    let out = coins.slice()
    if(category !== 'all' && category !== 'coins') return []
    if(query) out = out.filter(p=> p.name.toLowerCase().includes(query.toLowerCase()) || (p.description||'').toLowerCase().includes(query.toLowerCase()))
    if(sort === 'price_asc') out.sort((a,b)=> (a.priceUSD||0)-(b.priceUSD||0))
    if(sort === 'price_desc') out.sort((a,b)=> (b.priceUSD||0)-(a.priceUSD||0))
    return out
  },[coins, query, sort])

  return (
    <main className="px-3 py-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <h2 className="text-2xl md:text-3xl font-bold">Shop</h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <input placeholder="Search..." value={query} onChange={(e)=>setQuery(e.target.value)} className="border rounded px-3 py-2 text-sm w-full sm:w-auto" />
          <select value={category} onChange={(e)=>setCategory(e.target.value)} className="border rounded px-2 py-2 text-sm">
            {categories.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={sort} onChange={(e)=>setSort(e.target.value)} className="border rounded px-2 py-2 text-sm">
            <option value="featured">Featured</option>
            <option value="price_asc">Low → High</option>
            <option value="price_desc">High → Low</option>
          </select>
          <select value={currency} onChange={(e)=>setCurrency(e.target.value)} className="border rounded px-2 py-2 text-sm bg-yellow-100 font-semibold">
            <option value="USD">USD</option>
            <option value="INR">INR</option>
          </select>
        </div>
      </div>

      <section>
        <h3 className="text-xl md:text-2xl font-semibold mb-4">Ranks</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {filteredRanks.map(p=> <ProductCard key={p.id} product={p} currency={currency} />)}
        </div>

        <hr className="my-6" />

        <h3 className="text-xl md:text-2xl font-semibold mb-4">Coins</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-8">
          {filteredCoins.map(p=> <ProductCard key={p.id} product={p} currency={currency} />)}
        </div>
      </section>
    </main>
  )
}
