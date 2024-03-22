import React from 'react'

export default function ParticularTodo({todo, index}) {
  return (
    <div className='m-3 border border-gray-400 flex justify-between items-center py-2 pr-5 pl-3 bg-gray-100 rounded-md shadow-md'>
      <div className='flex justify-center items-center '>
        <div className="round flex items-center ">
          
          <input type="checkbox" id={`checkbox-${index}`} />
          <label for={`checkbox-${index}`}></label>
        </div>


        <label className="content ml-6 text-lg capitalize" for={`checkbox-${index}`}>
          {todo?.title}
        </label>

      </div>
      <div className="important">
        important
      </div>

    </div>
  )
}
