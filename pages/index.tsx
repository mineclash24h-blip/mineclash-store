import Link from 'next/link'
import { useState } from 'react'

export default function Home(){
  const [showToast, setShowToast] = useState(false)
  const serverText = 'play.mineclash.fun | 19132'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(serverText)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } catch (e) {
      // ignore clipboard errors silently
    }
  }

  return (
    <main>
      <section className="mb-8">
        <div className="container mx-auto px-4">
          <img src="/images/banner.jpeg" alt="MineClash banner" className="w-full h-56 object-cover rounded-lg shadow-lg" />
        </div>
      </section>
      

      <section className="hero-banner py-20 mb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="w-full text-center text-white">
              <h1 className="text-5xl font-bold mb-4">MineClash Store</h1>
              <p className="text-lg text-gray-100 mb-8">Shop ranks, crates and exclusive items for your Minecraft server.</p>
              <Link href="/shop" className="inline-block px-10 py-4 bg-yellow-300 text-gray-900 rounded-2xl font-bold text-lg hover:bg-yellow-400 shadow-lg hover:shadow-xl transition-shadow">Shop Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Info Box Section */}
      <section className="py-8">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <img src="/images/top%20logo.png" alt="Server Logo" className="w-20 h-20 mb-4 rounded-full shadow" />
            <h2 className="text-3xl font-bold mb-2 text-blue-700">Info Page</h2>
            <p className="text-lg text-gray-700 mb-6 text-center">Learn more about the MineClash server, features, ranks, and community. Click below for detailed information and server highlights.</p>
            <Link href="/info" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold text-base hover:bg-blue-700 shadow hover:shadow-md transition">Go to Info Page</Link>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl font-semibold text-gray-800 mb-2">Join our Minecraft server</p>
          <div className="flex flex-col items-center gap-3">
            <button onClick={handleCopy} aria-label="Copy server address" className="text-4xl font-bold text-blue-600 hover:opacity-90 focus:outline-none">
              {serverText}
            </button>

          </div>
        </div>
      </section>

      {showToast && (
        <div aria-live="polite" className="fixed bottom-6 right-6 bg-black bg-opacity-90 text-white px-4 py-2 rounded shadow-lg">
          Copied! Enjoy!!!
        </div>
      )}
    </main>
  )
}
