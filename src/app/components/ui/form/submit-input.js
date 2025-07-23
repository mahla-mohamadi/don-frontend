'use client';

export default function SubmitInput({ className = '', label = 'Login', ...props }) {
  return (
    <button
      type="submit"
      className={`buttonSubmit ${className}`}
      {...props}
    >
      {label}
    </button>
  );
}

// Usage:
<SubmitInput className="btn btn-primary" label="Login" />