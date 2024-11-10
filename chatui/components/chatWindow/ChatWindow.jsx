import React, { useEffect, useState } from 'react'
import MessageBox from '../messageBox/MessageBox'
import TextArea from '../TextArea'
import send from '../../public/send.svg'

const ChatWindow = ({ chatSequence, handleChatSequence, selectedId }) => {
  const [inputString, setInputString] = useState('');
  useEffect(() => {
    setInputString('');
  }, [selectedId])
  const handleQuery = () => {
    const curSelected = chatSequence[selectedId];
    const curMessageList = [...curSelected];
    curMessageList.push(inputString);
    handleChatSequence(curMessageList);
    setInputString('')
  }
  const handleInputString = (e) => {
    const value = e.target?.value || '';
    setInputString(value);
  };
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleQuery();
      setInputString('');
      e.preventDefault();
    }
  };

  const handleDelete = (id) => {
    const curSelected = chatSequence[selectedId];
    const curMessageList = [...curSelected];
    const newMessageList = curMessageList.filter((message, index) => index !== id);
    handleChatSequence(newMessageList)
  }

  return (
    <>
      {selectedId !== -1 && (
        <div className='flex flex-col gap-4 w-3/4 h-screen pt-8 relative'>
          <MessageBox
            chatMessageList={chatSequence[selectedId]}
            handleDelete={handleDelete}
          />

          <div className='flex w-full gap-4 absolute bottom-4'>
            <TextArea
              handleInputString={handleInputString}
              handleKeyDown={handleInputKeyDown}
              inputString={inputString}
              classString={'resize-none flex items-center w-full bg-chineseBlack text-base text-white font-normal non-italic focus:outline-none border border-solid border-gray-500 hideScrollBar pl-1'}
            />
            <img
              src={send.src}
              alt='send'
              className='cursor-pointer'
              onClick={handleQuery}
            />

          </div>
        </div>)
      }
    </>
  )
}

export default ChatWindow
