import React from "react";

export function Button({ onClick, className, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded text-white ${className}`}
    >
      {children}
    </button>
  );
}
