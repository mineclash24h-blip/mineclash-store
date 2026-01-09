import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCart } from '../../context/CartContext'

export default function UpiPage(){
  const router = useRouter()
  const { clear, items } = useCart()
  const [paid, setPaid] = useState(false)
  const [ign, setIgn] = useState('')
  const [amount, setAmount] = useState(0)
  const [order, setOrder] = useState<any | null>(null)
  const [email, setEmail] = useState('')
  const [emailSending, setEmailSending] = useState(false)

  useEffect(()=>{
    if(!router.isReady) return
    const q = router.query
    setIgn(String(q.ign || ''))
    setAmount(Number(q.amountINR || 0))
    setEmail(String(q.email || ''))
  },[router.isReady])

  const upiId = 'your-upi@bank' // replace with real UPI ID

  const handleVerify = async () => {
    // This is a manual/placeholder flow. In production you'd verify payment via backend.
    const now = new Date()
    const orderId = `ORD${now.getTime().toString().slice(-8)}`
    const orderObj = {
      id: orderId,
      ign,
      amount,
      items: items || [],
      createdAt: now.toISOString()
    }
    setOrder(orderObj)
    setPaid(true)
    // persist purchase info locally so staff/site can prevent duplicate rank purchases
    try{
      const raw = localStorage.getItem('mineclash_purchases')
      const purchases = raw ? JSON.parse(raw) : {}
      const existing = purchases[ign] || { rank: null, coins: 0 }
      // rank order
      const RANK_ORDER = ['BARON','VETERAN','MONARCH','EMPEROR','CRASH','CRASH+','CUSTOM RANK']
      const rankIndex = (name:any) => name ? RANK_ORDER.indexOf(String(name).toUpperCase()) : -1

      let newRank = existing.rank
      let newCoins = existing.coins || 0;

      (orderObj.items || []).forEach((it:any)=>{
        if(it.category === 'ranks'){
          const candidate = it.name
          const curIdx = rankIndex(newRank)
          const candIdx = rankIndex(candidate)
          if(candIdx > curIdx){
            newRank = candidate
          }
        }
        if(it.category === 'coins'){
          // sum coins by parsing name like '1000 COINS'
          const m = String(it.name).match(/(\d+)/)
          if(m) newCoins += Number(m[1]) * (it.qty || 1)
        }
      })

      purchases[ign] = { rank: newRank, coins: newCoins }
      localStorage.setItem('mineclash_purchases', JSON.stringify(purchases))
    }catch(e){
      // ignore storage errors
    }

    // Send receipt email if email is provided
    if(email){
      try {
        setEmailSending(true)
        const emailPayload = {
          to: email,
          playerIGN: ign,
          totalINR: amount,
          items: (orderObj.items || []).map((it: any) => ({
            name: it.name,
            qty: it.qty || 1,
            priceINR: it.priceINR || 0
          })),
          receiptId: orderId,
          timestamp: new Date(orderObj.createdAt).toLocaleString()
        }
        const res = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emailPayload)
        })
        if(res.ok){
          console.log('Receipt email sent successfully')
        }
      } catch(error) {
        console.error('Failed to send email:', error)
      } finally {
        setEmailSending(false)
      }
    }

    clear()
  }

  const handlePrint = () => {
    window.print()
  }

  const handleCopy = async () => {
    if(!order) return
    const text = `Order ${order.id}\nIGN: ${order.ign}\nAmount: ₹${order.amount}\nItems:\n` + (order.items || []).map((it:any)=>` - ${it.name} x${it.qty}`).join('\n')
    await navigator.clipboard.writeText(text)
    alert('Receipt copied to clipboard')
  }

  return (
    <main className="container mx-auto px-4 max-w-lg">
      <h2 className="text-2xl font-bold mb-4">UPI Payment</h2>
      <div className="bg-white rounded shadow p-6">
        <p className="mb-2">Player IGN: <strong>{ign}</strong></p>
        <p className="mb-4">Amount: <strong>₹{amount}</strong></p>

        <div className="mb-4">
          <p className="font-semibold">Pay via UPI</p>
          <p className="text-sm text-gray-600">UPI ID: <span className="font-mono">{upiId}</span></p>
          <div className="mt-4 flex gap-3">
            <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={() => navigator.clipboard?.writeText(upiId)}>Copy UPI ID</button>
            <a className="px-4 py-2 bg-gray-200 rounded" href={`upi://pay?pa=${upiId}&pn=MineClash&am=${amount}`}>Open UPI App</a>
          </div>
          <p className="text-sm text-gray-500 mt-3">After sending payment, press Verify to complete the order.</p>
        </div>

        {!paid ? (
          <div className="flex justify-end">
            <button onClick={handleVerify} className="px-4 py-2 bg-yellow-400 rounded">I have paid (Verify)</button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-green-600 font-semibold">Payment verified — thank you! Order completed.</p>
            </div>

            {order && (
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-bold mb-2">Receipt</h4>
                <div className="text-sm text-gray-700">
                  <div><strong>Order ID:</strong> {order.id}</div>
                  <div><strong>IGN:</strong> {order.ign}</div>
                  <div><strong>Amount:</strong> ₹{order.amount}</div>
                  <div><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</div>
                  <div className="mt-2"><strong>Items:</strong>
                    <ul className="list-disc list-inside">
                      {order.items && order.items.length ? order.items.map((it:any)=> (
                        <li key={it.id}>{it.name} × {it.qty}</li>
                      )) : <li>No items recorded</li>}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 flex gap-3 justify-end">
                  <button onClick={handleCopy} className="px-3 py-1 bg-gray-200 rounded">Copy Receipt</button>
                  <button onClick={handlePrint} className="px-3 py-1 bg-blue-600 text-white rounded">Print Receipt</button>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => router.push('/')}>Return Home</button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
