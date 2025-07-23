'use client';
import { useId } from 'react';

export default function PasswordInput({ value, onChange, className = '', label = 'Password', ...props }) {
  const id = useId();
  return (
    <div className={`inputContainer ${className}`}>
      <label htmlFor={id} className='inputLabel'>{label}</label>
      <input
        id={id}
        type="password"
        value={value}
        onChange={onChange}
        className='input'
        autoComplete="current-password"
        {...props}
      />
    </div>
  );
}
