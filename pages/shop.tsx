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
        setRanks(data.ranks || [])
        setCoins(data.coins || [])
      })
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
    <main>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <h2 className="text-2xl font-bold">Shop</h2>
        <div className="flex items-center gap-3">
          <input placeholder="Search products..." value={query} onChange={(e)=>setQuery(e.target.value)} className="border rounded px-3 py-1" />
          <select value={category} onChange={(e)=>setCategory(e.target.value)} className="border rounded px-2 py-1">
            {categories.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={sort} onChange={(e)=>setSort(e.target.value)} className="border rounded px-2 py-1">
            <option value="featured">Featured</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
          </select>
          
        </div>
      </div>

      <section>
        <h3 className="text-2xl font-semibold mb-4">Ranks</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {filteredRanks.map(p=> <ProductCard key={p.id} product={p} currency={currency} />)}
        </div>

        <hr className="my-8" />

        <h3 className="text-2xl font-semibold mb-4">Coins</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCoins.map(p=> <ProductCard key={p.id} product={p} currency={currency} />)}
        </div>
      </section>
    </main>
  )
}
