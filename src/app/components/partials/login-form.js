'use client';

import { useState } from 'react';
import EmailInput from '@/app/components/ui/form/email-input';
import PasswordInput from '@/app/components/ui/form/password-input';
import SubmitInput from '@/app/components/ui/form/submit-input';

export default function LoginForm({ className = '' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Logging in with: ${email} / ${password}`);
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <EmailInput
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="mb-2"
        label="ایمیل"
      />
      <PasswordInput
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="mb-2"
        label="رمز عبور"
      />
      <SubmitInput className="btn btn-primary" label="ورود" />
    </form>
  );
}
