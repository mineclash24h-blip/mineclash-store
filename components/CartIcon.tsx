export default function CartIcon({count=0}:{count?:number}){
  return (
    <div className="relative">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M6 6H4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 6h2l2.8 9.4a2 2 0 0 0 1.9 1.4h7.6a2 2 0 0 0 1.9-1.4L21 8H6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className={`absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full ${count === 0 ? 'invisible' : ''}`}>{count > 0 ? count : ''}</span>
    </div>
  )
}
