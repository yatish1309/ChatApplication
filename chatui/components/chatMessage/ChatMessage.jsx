'use client'
import React from 'react'
import deleteIcon from '../../public/delete.svg'
import user from '../../public/User.svg'

const ChatMessage = ({ message, handleDelete, index }) => {
  return (
    <div className=' ml-28 flex gap-2 justify-end w-3/4'>
      <img
        src={user.src}
        alt='user'
        className='w-8 h-8'
      />
      <div className='flex'>
        <div className='bg-chatColor text-chineseBlack text-sm p-3 flex items-center justify-center'>
          <span>{message}</span>
        </div>
        <div className='triangle-right w-0 h-0'></div>
      </div>

      <img
        src={deleteIcon.src}
        alt='delete'
        onClick={() => handleDelete(index)}
        className='bg-white cursor-pointer'
      />

    </div>
  )
}

export default ChatMessage
