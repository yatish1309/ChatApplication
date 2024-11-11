'use client'
import React, { useState } from 'react'
import plus from '../../public/plusIcon.svg'
import messages from '../../public/messages.svg'
import deleteIcon from '../../public/delete.svg'

import { addChat, add, create, createNewChat } from '../../constants/AppConstants';
import Portal from '../../Portal/Portal';

const Sidebar = ({
  chats,
  handleChats,
  chatSequence,
  handleChatSequence,
  handleChatDeletion,
  selectedId,
  handleSelectedId
}) => {
  const [showAddChat, setShowAddChat] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleAddChatClick = () => {
    setShowAddChat(true);
  }

  const handlePortalClick = () => {
    setShowAddChat(false);
  }

  const handleAddChat = () => {
    setIsDisabled(!isDisabled);
  }
  const handleChatClick = (id) => {
    handleSelectedId(id);
  }

  const handleDelete = (index, e) => {
    e.stopPropagation();
    const curChats = [...chats];
    const curSequence = [...chatSequence];
    const chatPart1 = curChats.slice(0, index);
    const chatPart2 = curChats.slice(index + 1, chats.length);
    const chatSeq1 = curSequence.slice(0, index);
    const chatSeq2 = curSequence.slice(index + 1, chats.length);
    const newChats = chatPart1.concat(chatPart2);
    const newChatSeq = chatSeq1.concat(chatSeq2);
    handleChatDeletion(newChats, newChatSeq, index);
  }

  const handleCreate = () => {
    handleChats();
    handleChatSequence([], true);
    setIsDisabled(true);
    setShowAddChat(false);
  }
  return (
    <>
      <div className='flex flex-col p-3 w-[30%] lg:w-[20%] h-screen overflow-scroll gap-4 hideScrollBar'>
        <div className='flex justify-around items-center w-full bg-sidebarColor p-2'>
          <span className='text-sm hidden md:block'>{addChat}</span>
          <span className='text-sm md:hidden'>{add}</span>
          <img
            src={plus.src}
            alt='plus'
            className='cursor-pointer w-4 h-4 md:w-8 md:h-8'
            onClick={handleAddChatClick} />
        </div>
        {
          chats?.map((chat, index) => {
            return (
              <div className={`flex justify-around items-center w-full ${selectedId === index ? 'bg-green-400' : 'bg-newChatColor'} p-2 cursor-pointer`}
                key={index}
                onClick={() => handleChatClick(index)}
              >
                <span className='text-xs md:text-sm text-black'>{chat}</span>
                <img
                  src={deleteIcon.src}
                  alt='delete'
                  className='cursor-pointer w-4 h-4 md:w-8 md:h-8'
                  onClick={(e) => handleDelete(index, e)}
                />
              </div>
            );
          })
        }
      </div>
      {
        showAddChat && (
          <Portal
            show={showAddChat}
            onClick={handlePortalClick}
          >
            <div className='w-full h-full flex items-center justify-center' >
              <div
                className='flex flex-col gap-4 justify-center items-center w-[16rem] h-[14rem] border border-solid border-gray-500 bg-black'
                onClick={(e) => {
                  e.stopPropagation();
                }}>
                <div
                  className={`flex justify-between ${isDisabled ? 'border border-solid border-gray-300 bg-gray-500' : 'bg-sidebarColor'} cursor-pointer p-4`}
                  onClick={handleAddChat}
                >
                  <img src={messages.src} alt='messages' />
                  <span className='flex items-center'>
                    {createNewChat}
                  </span>
                </div>
                <div className={`${isDisabled ? 'border border-solid border-gray-300 bg-none' : 'bg-green-500'} cursor-pointer p-2`}>
                  <button disabled={isDisabled} onClick={handleCreate}>{create}</button>
                </div>
              </div>
            </div>
          </Portal>
        )
      }
    </>
  )
}

export default Sidebar;
