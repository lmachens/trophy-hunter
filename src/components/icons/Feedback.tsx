import { FC } from 'react';

const Feedback: FC = () => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 9H23V20H6V9Z" fill="#77777A" />
      <path d="M6 20L18 12" stroke="#3F3E43" strokeWidth="0.5" />
      <path
        d="M6.93239 9.38004L22.9999 20"
        stroke="#3F3E43"
        strokeWidth="0.5"
      />
      <path
        opacity="0.7"
        d="M14.5 16L6 9.65028L6 9L23 9L23 9.65027L14.5 16Z"
        fill="#1F1F1F"
      />
      <path d="M14.5 15L6 9L23 9L14.5 15Z" fill="#77777A" />
    </svg>
  );
};

export default Feedback;
