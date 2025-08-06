'use client';

export default function Button({ className = '', onClick, text = 'توزیع نقش', disabled = false, tooltip = '', ...props }) {
  return (
    <button
      className={`generalButton ${className} relative ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      {...props}
    >
      {text}
    </button>
  )
}

// Usage:
<Button className="btn btn-primary" text="توزیع نقش" />

