import React, { useEffect, useRef } from 'react'
import ChatMessage from '../chatMessage/ChatMessage';

const MessageBox = ({ chatMessageList, handleDelete }) => {
  const messagesRef = useRef(null);

  useEffect(() => {
    if (chatMessageList.length) {
      messagesRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
    }

  }, [chatMessageList.length]);

  return (
    <>
      <div className='flex flex-col gap-4 items-center w-full pt-15 h-[90%] overflow-scroll hideScrollBar'>
        {
          chatMessageList?.map((message, index) => {
            return (
              <ChatMessage
                message={message.msg}
                date={message.date}
                type={message.type}
                handleDelete={handleDelete}
                index={index}
                key={index}
              />
            );

          })
        }
        <div ref={messagesRef}></div>
      </div>
    </>
  )
}

export default MessageBox
