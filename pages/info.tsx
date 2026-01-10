import React from 'react';

export default function Info() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-4 sm:p-8 mt-8 flex flex-col items-center">
        <img src="/images/top%20logo.png" alt="Server Logo" className="w-20 h-20 sm:w-24 sm:h-24 mb-6 rounded-full shadow" />
        <h1 className="text-4xl font-bold mb-4 text-blue-700">MineClash Server Information</h1>
        <div className="space-y-8 w-full">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <img src="/images/product-placeholder.svg" alt="Placeholder" className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg shadow" />
            <p className="text-base sm:text-lg text-center sm:text-left">Welcome to MineClash! This is an example description about the server. Here you can add details about gameplay, features, and community events.</p>
          </div>
          <div className="flex flex-col sm:flex-row-reverse items-center gap-4 sm:gap-6">
            <img src="/images/product-placeholder.svg" alt="Placeholder" className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg shadow" />
            <p className="text-base sm:text-lg text-center sm:text-left">Our server offers unique ranks, custom plugins, and a friendly player base. Example text for more information about what makes MineClash special.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <img src="/images/product-placeholder.svg" alt="Placeholder" className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg shadow" />
            <p className="text-base sm:text-lg text-center sm:text-left">Join us for regular events, giveaways, and competitions. Example text for server activities and engagement.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
