'use client'
import React, { useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import ChatWindow from '../chatWindow/ChatWindow'

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [chatSequence, setChatSequence] = useState([]);
  const handleChats = () => {
    setChats([...chats, 'New chat']);
  }
  const handleChatSequenceUpdation = (newChatSequence, id) => {
    const curSequence = [...chatSequence];
    if (id >= chatSequence.length) {
      curSequence.push(newChatSequence);
    } else {
      curSequence[id] = newChatSequence;
    }
    setChatSequence([...curSequence]);
  }

  const handleChatDeletion = (newChats, newChatSeq) => {
    setChats(newChats);
    setChatSequence(newChatSeq);
  }
  return (
    <div className="flex gap-1">
      <Sidebar
        chats={chats}
        handleChats={handleChats}
        chatSequence={chatSequence}
        handleChatSequence={handleChatSequenceUpdation}
        handleChatDeletion={handleChatDeletion}
      />
      <ChatWindow />
    </div>
  )
}

export default ChatPage
