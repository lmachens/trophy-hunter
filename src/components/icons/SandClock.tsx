import { FC, SVGProps } from 'react';

const SandClock: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.0495 3.5L9.50001 10.1174L4.95052 3.5L14.0495 3.5Z"
        stroke="#EAEAEA"
      />
      <path
        d="M5.02873 16.5L9.49999 10.8093L13.9713 16.5L5.02873 16.5Z"
        stroke="#EAEAEA"
      />

      <g className="frame-1">
        <path d="M9.5 17V9.5L7 6H9.5Z" fill="#EAEAEA" />
        <path d="M9.5 17V9.5L12 6H9.5Z" fill="#AFAFAF" />
      </g>
      <g className="frame-2">
        <path d="M9.5 17V9.5L8.5 8H9.5Z" fill="#EAEAEA" />
        <path d="M9.5 17V9.5L10.5 8H9.5Z" fill="#AFAFAF" />
        <path d="M9.5 17V15L5 17H9.5Z" fill="#EAEAEA" />
        <path d="M9.5 17V15L14 17H9.5Z" fill="#AFAFAF" />
      </g>
      <g className="frame-3">
        <path d="M9.5 17V14L5 17H9.5Z" fill="#EAEAEA" />
        <path d="M9.5 17V14L14 17H9.5Z" fill="#AFAFAF" />
      </g>
    </svg>
  );
};

export default SandClock;
