// app/layout.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LoadingProvider , useLoading } from '../context/LoadingContext';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProgress(100);
    const timer = setTimeout(() => {
      setShowProgress(false);
      setProgress(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!showProgress) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90; 
        return prev + Math.random() * 10;
      });
    }, 300);

    return () => clearInterval(timer);
  }, [showProgress]);

  // Intercept link clicks
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target;
      const anchor = target.closest('a');
      
      if (!anchor || !anchor.href) return;
      
      if (anchor.href.includes('#') || anchor.target || !anchor.href.startsWith(window.location.origin)) {
        return;
      }
      
      const targetPath = new URL(anchor.href).pathname;
      
      if (targetPath === pathname) {
        return;
      }
      
      e.preventDefault();
      setProgress(10);
      setShowProgress(true);
      
      setTimeout(() => {
        router.push(targetPath);
      }, 10);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [router, pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="text-center p-6">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <>
    <LoadingProvider>
      {showProgress && (
        <div className="fixed top-0 left-0 right-0 h-[2px] z-[9999] bg-gray-200">
          <div
            className="h-full bg-sky-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {children}
      </LoadingProvider>
    </>
  );
}

function LoadingSpinner() {
  const { isLoading } = useLoading();
  if (!isLoading) return null;
  return (
    <svg
      width={60}
      height={60}
      viewBox="0 0 44 44"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#00a0ee"
    >
      <g fill="none" fillRule="evenodd" strokeWidth={3}>
        <circle cx={22} cy={22} r={1}>
          <animate
            attributeName="r"
            begin="0s"
            dur="1.8s"
            values="1; 20"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.165, 0.84, 0.44, 1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            begin="0s"
            dur="1.8s"
            values="1; 0"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.3, 0.61, 0.355, 1"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx={22} cy={22} r={1}>
          <animate
            attributeName="r"
            begin="-0.9s"
            dur="1.8s"
            values="1; 20"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.165, 0.84, 0.44, 1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            begin="-0.9s"
            dur="1.8s"
            values="1; 0"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.3, 0.61, 0.355, 1"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
}