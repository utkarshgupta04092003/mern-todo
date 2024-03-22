import React from 'react'

export default function HomeMiddle() {
  return (
      <div className="w-1/4 p-4 border border-red-500">
        {/* Todo List */}
        <div>
          <h3 className="font-bold mb-2">Todo List</h3>
          <ul>
            <li className="border-b border-gray-200 py-2">Task 1</li>
            <li className="border-b border-gray-200 py-2">Task 2</li>
            <li className="border-b border-gray-200 py-2">Task 3</li>
            {/* Add more tasks as needed */}
          </ul>
        </div>
      </div>
  )
}
