import React from 'react'

export default function ParticularTodo() {
  const index = 0;
  return (
    <div className='m-3 border border-gray-400 flex justify-between items-center py-3 pr-5 pl-3 bg-gray-100 rounded-md '>
      <div className='flex justify-center items-center '>
        <div className="round flex items-center ">
          
          <input type="checkbox" id={`checkbox-${index}`} />
          <label for={`checkbox-${index}`}></label>
        </div>


        <label className="content ml-6 text-xl capitalize" for={`checkbox-${index}`}>
          content
        </label>

      </div>
      <div className="important">
        important
      </div>

    </div>
  )
}
