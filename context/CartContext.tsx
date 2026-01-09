import React, { createContext, useContext, useEffect, useState } from 'react'

type CartItem = { id: number; name: string; priceUSD?: number; priceINR?: number; qty: number }

type CartContextValue = {
  items: CartItem[]
  add: (item: CartItem) => void
  remove: (id: number) => void
  clear: () => void
  count: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function useCart(){
  const ctx = useContext(CartContext)
  if(!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export function CartProvider({children}:{children:React.ReactNode}){
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try{
      const raw = localStorage.getItem('mineclash_cart')
      if(raw) setItems(JSON.parse(raw))
    }catch{}
  }, [])

  useEffect(()=>{
    try{ localStorage.setItem('mineclash_cart', JSON.stringify(items)) }catch{}
  },[items])

  const add = (item: CartItem) => {
    setItems(prev=>{
      const exists = prev.find(p=>p.id===item.id)
      if(exists) return prev.map(p=> p.id===item.id ? {...p, qty: p.qty + item.qty} : p)
      return [...prev, item]
    })
  }

  const remove = (id:number) => setItems(prev => prev.filter(p=>p.id!==id))
  const clear = ()=> setItems([])
  const count = items.reduce((s,i)=>s+i.qty,0)

  return (
    <CartContext.Provider value={{items, add, remove, clear, count}}>
      {children}
    </CartContext.Provider>
  )
}

export type { CartItem }
