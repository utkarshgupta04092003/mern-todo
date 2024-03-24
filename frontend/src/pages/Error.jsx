import React from 'react';

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Oops! Looks like you've wandered off the path.</p>
      <div className="text-blue-500 hover:text-blue-700">
        <a href="/">Go back home</a>
      </div>
    </div>
  );
};

export default Error;
