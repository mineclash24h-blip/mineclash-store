import { createContext, useContext, useState, ReactNode } from 'react'

interface CurrencyContextType {
  currency: 'USD' | 'INR'
  setCurrency: (c: 'USD' | 'INR') => void
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD')

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider')
  }
  return context
}
