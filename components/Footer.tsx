export default function Footer(){
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="font-bold mb-2">MineClash Store</h3>
          </div>
          <div>
            <h3 className="font-bold mb-2">Links</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li><a href="#" className="hover:text-white">Shop</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Terms</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Support</h3>
            <p className="text-sm text-gray-400">Email: mineclash24h@gmail.com</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
          © 2026 MineClash. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
