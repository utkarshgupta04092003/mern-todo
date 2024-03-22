import React, {useState} from 'react'
import ParticularTodo from './ParticularTodo'



export default function HomeMiddle() {

  return(
    <div className='border border-red-500 w-full p-3 bg-white'>
      <h1>Category name</h1>
      <div>
      <ParticularTodo/>
      <ParticularTodo/>
      <ParticularTodo/>
      <ParticularTodo/>
      <ParticularTodo/>

      </div>
    </div>
  )

}
