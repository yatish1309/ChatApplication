'use client'
import React, { useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import ChatWindow from '../chatWindow/ChatWindow'

//The main page start here it has 2 parts sideBar and ChatWindow
const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [chatSequence, setChatSequence] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(-1);
  const handleChats = () => {
    setChats([...chats, 'New chat']);
    setSelectedChatId(chats.length);
  }
  const handleChatSequenceUpdation = (newChatSequence, newlycreate = false) => {
    const curSequence = [...chatSequence];
    if (newlycreate) {
      curSequence.push(newChatSequence);
      setSelectedChatId(curSequence.length - 1);
    } else {
      if (selectedChatId >= chatSequence.length) {
        curSequence.push(newChatSequence);
      } else {
        curSequence[selectedChatId] = newChatSequence;
      }
    }
    setChatSequence([...curSequence]);
  }

  const handleSelectedId = (id) => {
    setSelectedChatId(id);
  }

  const handleChatDeletion = (newChats, newChatSeq, id) => {
    setChats(newChats);
    setChatSequence(newChatSeq);
    if (selectedChatId === id) {
      if (newChats.length === 0) {
        setSelectedChatId(-1);
      } else {
        if (id === newChats.length) {
          setSelectedChatId(id - 1);
        } else {
          setSelectedChatId(id);
        }
      }
    } else {
      if (id < selectedChatId) {
        setSelectedChatId(id => id - 1)
      }
    }
  }
  return (
    <div className="flex gap-1">
      <Sidebar
        chats={chats}
        handleChats={handleChats}
        chatSequence={chatSequence}
        handleChatSequence={handleChatSequenceUpdation}
        handleChatDeletion={handleChatDeletion}
        selectedId={selectedChatId}
        handleSelectedId={handleSelectedId}
      />
      <ChatWindow
        chatSequence={chatSequence}
        handleChatSequence={handleChatSequenceUpdation}
        selectedId={selectedChatId}
      />
    </div>
  )
}

export default ChatPage
