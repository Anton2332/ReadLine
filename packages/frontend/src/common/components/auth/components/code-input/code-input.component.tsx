import React, { useEffect, useState } from 'react';
import * as Styled from './code-input.styled';

interface ICodeInputComponentProps {
  onFinish?: (code: string) => void;
  disabled?: boolean;
  className?: string;
}

export const CodeInputComponent = ({ onFinish, disabled, className }: ICodeInputComponentProps) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [currentFocus, setCurrentFocus] = useState(0);

  useEffect(() => {
    const firstInput = document.getElementById('code-input-0');
    if (firstInput) {
      firstInput.focus();
    }
  }, []);

  useEffect(() => {
    if (onFinish && code.every((val) => !!val)) {
      onFinish(code.join(''));
    }
  }, [code]);

  const formatInput = (text: string) => text?.toUpperCase().replace(/[^A-Z0-9]/g, '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value: inputValue } = e.target;
    let value = formatInput(inputValue);
    value = inputValue.length > 1 ? value[value.length - 1] : value;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (!value && index > 0) {
      const previousInput = document.getElementById(`code-input-${index - 1}`);
      if (previousInput) {
        previousInput.focus();
      }
    } else if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!code[currentFocus]) {
        const previousInput = document.getElementById(`code-input-${currentFocus - 1}`);
        if (previousInput) {
          e.preventDefault();
          previousInput.focus();
          const newCode = [...code];
          newCode[currentFocus - 1] = '';
          setCode(newCode);
        }
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    e?.preventDefault();
    const pastedText = formatInput(e?.clipboardData?.getData('text')?.trim());

    if (pastedText) {
      const newCode = [...code].map((val, i) => {
        if (i >= index && i < index + pastedText.length) {
          const pastedTextIndex = i - index;
          return pastedText[pastedTextIndex];
        }
        return val;
      });
      setCode(newCode);
    }
  };

  return (
    <Styled.Container className={className}>
      {code.map((digit, index) => (
        <Styled.InputField
          key={index}
          id={`code-input-${index}`}
          type="text"
          maxLength={2}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          onKeyDown={handleKeyDown}
          onFocus={() => setCurrentFocus(index)}
          disabled={!!disabled}
        />
      ))}
    </Styled.Container>
  );
};
