import React from 'react';

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 w-full">
      <h1 className="text-3xl font-bold mb-4">Welcome to Your Todo App!</h1>
      <p className="text-lg text-gray-700">Please select a category to view your todos.</p>
    </div>
  );
};

export default Welcome;
