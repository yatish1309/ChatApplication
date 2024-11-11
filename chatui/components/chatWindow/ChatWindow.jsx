import React, { useEffect, useState } from 'react'
import MessageBox from '../messageBox/MessageBox'
import TextArea from '../TextArea'
import send from '../../public/send.svg'
import { AI, MOCK_MESSAGE, USER } from '../../constants/AppConstants'

const ChatWindow = ({ chatSequence, handleChatSequence, selectedId }) => {
  const [inputString, setInputString] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    setInputString('');
  }, [selectedId])

  useEffect(() => {
    if (messageSent) {
      const curSelected = chatSequence[selectedId];
      const curMessageList = [...curSelected];
      curMessageList.push({
        msg: MOCK_MESSAGE,
        date: new Date(),
        type: AI
      });
      handleChatSequence(curMessageList);
      setMessageSent(false);
    }
  }, [messageSent])

  const handleQuery = () => {
    const curSelected = chatSequence[selectedId];
    const curMessageList = [...curSelected];
    curMessageList.push({
      msg: inputString,
      date: new Date(),
      type: USER
    });
    handleChatSequence(curMessageList);
    setInputString('');
    setMessageSent(true);
  }

  const handleInputString = (e) => {
    const value = e.target?.value || '';
    setInputString(value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleQuery();
      setInputString('');
      setMessageSent(true);
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
        <div className='flex flex-col gap-4 w-[65%] lg:w-3/4 h-screen pt-8 relative'>
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
              disabled={messageSent}
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
