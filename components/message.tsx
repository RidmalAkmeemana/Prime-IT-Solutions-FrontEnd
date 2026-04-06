"use client";

import { useState, useEffect } from "react";

interface MessageProps {
  onClose: () => void; // function to close the toast
  status?: "success" | "error"; // optional, defaults to success
  title?: string;
  description?: string;
  className?: string;
}

export default function Message({
  onClose,
  status = "success",
  title,
  description,
  className = "",
}: MessageProps) {
  const isSuccess = status === "success";
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setIsClosing(false);

    // Start fade-out animation after 4.7 seconds (0.3s animation + 5s total)
    const autoHideTimer = setTimeout(() => {
      setIsClosing(true);
    }, 4700);

    // Close after animation completes (5s total)
    const closeTimer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(autoHideTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose, status]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // Wait for fade-out animation
  };

  const resolvedTitle =
    title ?? (isSuccess ? "Message successfully sent!" : "Message failed to send");
  const resolvedDescription =
    description ??
    (isSuccess
      ? "Wait a moment while we process your request."
      : "Please try again or contact support.");

  return (
    <div className={`fixed right-4 bottom-4 z-[9999] ${className}`}>
      <div
        className={`${
          isSuccess ? "bg-white" : "bg-white"
        } inline-flex space-x-3 p-3 text-sm rounded border ${
          isSuccess ? "border-gray-200" : "border-red-200"
        } shadow-lg transition-opacity duration-300 ${
          isClosing ? "opacity-0" : "opacity-100 animate-fadeIn"
        }`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isSuccess ? (
            <path
              d="M16.5 8.31V9a7.5 7.5 0 1 1-4.447-6.855M16.5 3 9 10.508l-2.25-2.25"
              stroke="#22C55E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M9 1.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15zM6 9h6M9 6v6"
              stroke="#EF4444"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
        <div>
          <h3 className={`${isSuccess ? "text-slate-700" : "text-red-700"} font-medium`}>
            {resolvedTitle}
          </h3>
          <p className={`${isSuccess ? "text-slate-500" : "text-red-500"}`}>
            {resolvedDescription}
          </p>
        </div>
        <button
          type="button"
          aria-label="close"
          onClick={handleClose}
          className="cursor-pointer mb-auto text-slate-400 hover:text-slate-600 active:scale-95 transition"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="12.532"
              width="17.498"
              height="2.1"
              rx="1.05"
              transform="rotate(-45.74 0 12.532)"
              fill="currentColor"
              fillOpacity=".7"
            />
            <rect
              x="12.531"
              y="13.914"
              width="17.498"
              height="2.1"
              rx="1.05"
              transform="rotate(-135.74 12.531 13.914)"
              fill="currentColor"
              fillOpacity=".7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}