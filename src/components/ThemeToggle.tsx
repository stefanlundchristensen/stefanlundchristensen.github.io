import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.getAttribute('data-theme') === 'dark');
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : '');
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <button className="theme-toggle" onClick={toggle} title={dark ? 'Light mode' : 'Dark mode'}>
      {dark ? '☀' : '☽'}
    </button>
  );
}
