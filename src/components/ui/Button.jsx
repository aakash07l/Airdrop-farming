import React from "react";

export function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-white"
    >
      {children}
    </button>
  );
}
