'use client';

import { useId } from 'react';

export default function TextInput({ 
  value, 
  onChange, 
  className = '', 
  label = '', 
  ...props 
}) {
  const id = useId();

  return (
    <div className={className}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}
