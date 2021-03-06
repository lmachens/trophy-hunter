import { FC } from 'react';

type Props = {
  disabled?: boolean;
};
const SpecialIcon: FC<Props> = ({ disabled = false, ...props }) => {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0)">
        <rect
          x="28.2853"
          y="9.29346"
          width="6.00987"
          height="32.5516"
          transform="rotate(30 28.2853 9.29346)"
          fill={!disabled ? '#EF3FA1' : '#353535'}
        />
        <rect
          x="37.1827"
          y="5.94922"
          width="5.97656"
          height="39.8968"
          transform="rotate(30 37.1827 5.94922)"
          fill={!disabled ? '#EF7067' : '#504E4E'}
        />
        <rect
          x="44.965"
          y="4.44873"
          width="5.98753"
          height="45.0872"
          transform="rotate(30 44.965 4.44873)"
          fill={!disabled ? '#EF973A' : '#666666'}
        />
        <rect
          x="53.8263"
          y="0.981934"
          width="6.04859"
          height="52.5383"
          transform="rotate(30 53.8263 0.981934)"
          fill={!disabled ? '#FBBA38' : '#77777A'}
        />
        <path
          d="M53 50H1V41H10L9.87805 34.0909H18.5V29H35.561V34.0909H44V41H53V50Z"
          fill={!disabled ? '#C0C0C0' : '#636365'}
        />
        <path
          d="M1 50H32V34.0909V29H18.439V34.0909H10V41H1V50Z"
          fill={!disabled ? '#E8E8E8' : '#77777A'}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.75 12H10.25V14.25H8V15.75H10.25V18H11.75V15.75H14V14.25H11.75V12Z"
          fill={!disabled ? '#EF1ACD' : '#C4C4C4'}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M32.5 55H31.5V56.5H30V57.5H31.5V59H32.5V57.5H34V56.5H32.5V55Z"
          fill={!disabled ? '#EF874D' : '#C4C4C4'}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M58.5 25H57.5V26.5H56V27.5H57.5V29H58.5V27.5H60V26.5H58.5V25Z"
          fill={!disabled ? '#FBBA38' : '#C4C4C4'}
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <path d="M0 0H60V60H0V0Z" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SpecialIcon;
