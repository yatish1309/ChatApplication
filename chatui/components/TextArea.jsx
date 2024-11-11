import React, { useEffect, useRef, useState } from 'react';

const TextArea = ({
  classString,
  inputString,
  handleInputString,
  handleKeyDown,
  disabled
}) => {
  const textAreaRef = useRef(null);
  const [maxTextAreaHeight, setMaxTextAreaHeight] = useState(0);
  const minRows = 1;
  const maxRows = 5;
  const [rows, setRows] = useState(minRows);
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '0px';
      const textAreaHeight = textAreaRef.current.scrollHeight;
      const lineHeight = parseInt(
        getComputedStyle(textAreaRef.current, null)
          .getPropertyValue('line-height')
          .split('px')[0]
      );
      const lineCount = Math.floor(textAreaHeight / lineHeight);
      if (lineCount <= maxRows && lineCount >= minRows) {
        textAreaRef.current.rows = lineCount;
        textAreaRef.current.style.height = `${textAreaHeight}px`;
        setMaxTextAreaHeight(textAreaHeight);
      } else if (lineCount > maxRows) {
        textAreaRef.current.rows = maxRows;
        textAreaRef.current.style.height = `${maxTextAreaHeight}px`;
      }
    }
  }, [textAreaRef.current, inputString]);
  return (
    <textarea
      id="chatInputTextArea"
      className={classString}
      autoFocus={true}
      rows={rows}
      disabled={disabled}
      value={inputString}
      onChange={handleInputString}
      onKeyDown={handleKeyDown}
      ref={textAreaRef}
    />
  );
};

export default TextArea;