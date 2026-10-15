import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#1A1A1A] border border-[#FF5A1F]/50 text-[#F5F5F5] px-4 py-3 shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
      <CheckCircle2 className="w-5 h-5 text-[#FF5A1F] shrink-0" />
      <span className="text-xs font-medium tracking-wide">{message}</span>
      <button
        onClick={onClose}
        className="text-[#777777] hover:text-white transition-colors ml-2"
        aria-label="Dismiss toast"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
