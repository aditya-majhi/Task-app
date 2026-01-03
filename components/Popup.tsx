"use client";

import { useEffect } from "react";
import { X, ClipboardList } from "lucide-react";

export function Modal({
  open,
  onClose,
  children,
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div className="relative px-8 py-6 border-b border-gray-100 bg-blue-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
                  <ClipboardList className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              </div>
              <button
                onClick={onClose}
                className="group p-2.5 text-gray-400 hover:text-gray-600 hover:bg-white/80 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 transition-transform group-hover:rotate-90 duration-300" />
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-100px)] custom-scrollbar">
          {children}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
}
