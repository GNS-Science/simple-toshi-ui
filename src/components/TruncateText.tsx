import React from 'react';

/**
 * Truncates text to a given length.
 */
const truncate = (text: string, maxLength = 60): string => {
  if (text.length > maxLength) {
    const sideLength = Math.floor(maxLength / 2);
    const left = text.substr(0, sideLength);
    const right = text.substr(text.length - sideLength, sideLength);
    return `${left} ... ${right}`;
  }
  return text;
};

export interface TruncateTextProps {
  text: string;
  maxLength?: number;
}

const TruncateText: React.FC<TruncateTextProps> = ({ text, maxLength }: TruncateTextProps) => {
  return <span title={text}>{truncate(text, maxLength)}</span>;
};

export default TruncateText;
