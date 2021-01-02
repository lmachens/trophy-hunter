import { FC } from 'react';

type Props = {
  disabled?: boolean;
};
const ObjectivesIcon: FC<Props> = ({ disabled = false, ...props }) => {
  const color = !disabled ? '#0F8CFF' : '#77777A';

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
        <path
          d="M34.1447 5.0166L27.7789 19.0143L40.194 20.6915L45.4691 11.5548L34.1447 5.0166Z"
          fill={color}
        />
        <path
          d="M43.0675 12.7423L45.4689 11.555L40.1195 20.8204L38.6097 20.4635L43.0675 12.7423Z"
          fill={!disabled ? '#0963B7' : '#636365'}
        />
        <path
          d="M58.2825 23.2419L43.0684 12.7422L37.719 22.0076L58.2825 23.2419Z"
          fill={!disabled ? '#0B6ECA' : '#636365'}
        />
        <rect
          x="29.9337"
          y="2.16455"
          width="2.6747"
          height="53.1968"
          transform="rotate(24.8918 29.9337 2.16455)"
          fill="#46444B"
        />
        <path
          d="M9 17L9.81027 19.1897L12 20L9.81027 20.8103L9 23L8.18973 20.8103L6 20L8.18973 19.1897L9 17Z"
          fill={color}
        />
        <path
          d="M34 32L34.8103 34.1897L37 35L34.8103 35.8103L34 38L33.1897 35.8103L31 35L33.1897 34.1897L34 32Z"
          fill={color}
        />
        <path
          d="M48 0L48.8103 2.18973L51 3L48.8103 3.81027L48 6L47.1897 3.81027L45 3L47.1897 2.18973L48 0Z"
          fill={color}
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

export default ObjectivesIcon;
