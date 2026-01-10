import React from 'react';

export default function Maintenance() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Site Under Maintenance</h1>
      <p className="text-lg mb-8">We are currently performing scheduled maintenance.<br />Please check back later.</p>
      <span className="text-sm text-gray-500">Thank you for your patience!</span>
    </div>
  );
}
