'use client';
import { useId } from 'react';

export default function EmailInput({ value, onChange, className = '', label = 'Email', ...props }) {
  const id = useId();
  return (
    <div className={`inputContainer ${className}`}>
      <label htmlFor={id} className='inputLabel'>{label}</label>
      <input
        id={id}
        type="email"
        value={value}
        onChange={onChange}
        className='input'
        autoComplete="email"
        {...props}
      />
    </div>
  );
}
