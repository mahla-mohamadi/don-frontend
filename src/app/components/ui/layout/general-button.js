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
      {tooltip && (
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          {tooltip}
        </span>
      )}
    </button>
  )
}

// Usage:
<Button className="btn btn-primary" text="توزیع نقش" />

