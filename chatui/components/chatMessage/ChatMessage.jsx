'use client'
import React from 'react'
import deleteIcon from '../../public/delete.svg'
import user from '../../public/User.svg'
import checks from '../../public/checks.svg'
import { AI, USER } from '../../constants/AppConstants'

const ChatMessage = ({ message, date, type, handleDelete, index }) => {
  return (
    <div className={`flex gap-2 w-3/4 ${type === AI ? 'mr-10 lg:mr-28 justify-start' : 'ml-10 lg:ml-28 justify-end'}`}>
      <img
        src={user.src}
        alt='user'
        className={`w-8 h-8 ${type === AI ? 'hidden' : ''}`}
      />
      <div className='flex'>
        <div className={`triangle-left w-0 h-0 ${type === AI ? '' : 'hidden'}`}>
        </div>
        <div className='bg-chatColor text-chineseBlack text-sm p-3 flex items-center justify-center gap-3 md:gap-2'>
          <span className='text-xs md:text-base'>{message}</span>
          <div className='flex items-end justify-center gap-1'>
            <span className='text-xs'>{`${date.getHours()}:${date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`}`}</span>
            <img
              src={checks.src}
              alt='checks'
              className={`w-4 h-4 ${type === AI ? 'hidden' : ''}`}
            />
          </div>
        </div>
        <div className={`triangle-right w-0 h-0 ${type === AI ? 'hidden' : ''}`}></div>
      </div>

      <img
        src={deleteIcon.src}
        alt='delete'
        onClick={() => handleDelete(index)}
        className='bg-white cursor-pointer w-8 h-8'
      />

    </div>
  )
}

export default ChatMessage
