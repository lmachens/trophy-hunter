import { FC } from 'react';

type Props = {
  disabled?: boolean;
};
const TeamworkIcon: FC<Props> = ({ disabled = false, ...props }) => {
  const color = !disabled ? '#07EF1E' : '#77777A';

  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3 39L5.5 25H18.5L28 22L31.5 23.5V29.5L45.5 45L42 48.5L40.5 47L34 40L40 47.5L37.5 50L32.5 46L36.5 50L34 52L30.5 49.5L32.1 51.5L30.5 53.5L21.5 48L11 42L3 39Z"
        fill={color}
      />
      <path
        d="M30.5 53.5L21.5 48L31.5 29.5L45.5 45L42 48.5L40.5 47L34 40L40 47.5L37.5 50L32.5 46L36.5 50L34 52L30.5 49.5L32.1 51.5L30.5 53.5Z"
        fill={!disabled ? '#04D719' : '#636365'}
      />
      <path
        d="M20.5 33L32.5 21.5L42.5 25L57 24.5L58 39L51.5 40.5L45.5 45L32 30L23.5 36L20.5 33Z"
        fill="#3F3E43"
      />
      <path d="M15 38.5L12 43L15 45L17.5 40.5L15 38.5Z" fill="#525058" />
      <path
        d="M20.5 39.5L15.5 45.5L18.5 48L23.5 42L20.5 39.5Z"
        fill="#525058"
      />
      <path d="M24.5 43L19.5 48.5L22.5 50.5L27 45.5L24.5 43Z" fill="#525058" />
      <path d="M27 47L23.5 51L26 53L29.5 49.5L27 47Z" fill="#525058" />
      <path
        d="M30.0404 7.45495V14.0001L25 9.47505V7.69737L26.2195 6.00049H28.6584L30.0404 7.45495Z"
        fill={color}
      />
      <path
        d="M29.9599 7.45447V13.9996L35.0004 9.47456V7.69688L33.7809 6H31.342L29.9599 7.45447Z"
        fill={color}
      />
    </svg>
  );
};

export default TeamworkIcon;
