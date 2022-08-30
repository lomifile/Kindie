import React from "react";

export const FirstCardIcon: React.FC<{}> = ({}) => {
  return (
    <svg
      className="hi-outline hi-cube inline-block w-12 h-12 text-primary"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      ></path>
    </svg>
  );
};
