import React, { useState } from 'react';

export default function Maintenance() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSecretClick = () => {
    setShowPrompt(true);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === 'PranavAndAk27') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('mineclash_bypass', 'true');
        window.location.reload();
      }
    } else {
      setError('Incorrect password.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 relative">
      <h1 className="text-3xl font-bold mb-4">Site Under Maintenance</h1>
      <p className="text-lg mb-8">We are currently performing scheduled maintenance.<br />Please check back later.</p>
      <span className="text-sm text-gray-500">Thank you for your patience!</span>
      <span className="text-sm text-gray-500">MineClash</span>

      {/* Secret Button */}
      <button
        className="fixed bottom-4 right-4 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center z-50 border border-gray-300 hover:bg-gray-100"
        style={{ opacity: 0.7 }}
        onClick={handleSecretClick}
        aria-label="Secret Access"
      >
        <span className="text-gray-400 text-xl">•</span>
      </button>

      {/* Password Prompt */}
      {showPrompt && (
        <div className="fixed bottom-16 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-50">
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-semibold mb-2">Enter password:</label>
            <input
              type="password"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-2"
              autoFocus
            />
            <button type="submit" className="w-full px-3 py-1 bg-blue-600 text-white rounded">Unlock</button>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </form>
        </div>
      )}
    </div>
  );
}
