// src/app/components/Modal.tsx
import React, { useEffect } from 'react';
import { MdClose } from "react-icons/md";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Modal({ open, onClose, children, title }: ModalProps) {
  // Close on ESC
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="fixed inset-0 z-40"
        onMouseDown={e => {
          if (e.target === e.currentTarget) onClose();
        }}
      />
      <div
        className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative z-50"
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Modal'}
        onClick={e => e.stopPropagation()}
      >
        {title && (
          <div className="text-xl font-semibold flex items-center gap-2">
            {typeof title === 'string' ? (() => {
              const match = title.match(/^\p{Emoji}/u);
              return match ? <span className="text-2xl">{match[0]}</span> : null;
            })() : null}
            <span className="font-tech">{typeof title === 'string' ? title.replace(/^\p{Emoji}/u, '').trim() : title}</span>
          </div>
        )}
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <MdClose size={24} />
        </button>
        {children}
      </div>
    </div>
  );
}