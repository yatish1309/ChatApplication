'use client'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom';

const DELAY = 200;
const isServer = () => {
  if (typeof window !== undefined) return false;
  return true;
}
const useDelayUmount = (isMounted, delayTime) => {
  const [showDiv, setShowDiv] = useState(false);
  useEffect(() => {
    let timeoutId;
    if (isMounted && !showDiv) {
      setShowDiv(true);
    } else if (!isMounted && showDiv) {
      timeoutId = setTimeout(() => setShowDiv(false), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, showDiv])
  return showDiv;
}
const Portal = ({ show, onClick, children }) => {
  const showDiv = useDelayUmount(show, DELAY);
  const portal = showDiv ? (
    <div onClick={onClick}
      className='w-full h-full flex justify-center items-center'
      style={{
        position: "fixed",
        top: "0px",
        zIndex: "1",
        backgroundColor: "rgba(0,0,0,0.6)",
      }}
    >
      {children}
    </div>
  ) : null;
  if (isServer()) return null;
  return createPortal(
    portal,
    document.getElementById('modal-root')
  );
}

export default Portal;
