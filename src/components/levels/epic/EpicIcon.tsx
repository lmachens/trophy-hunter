import { FC } from 'react';

type Props = {
  disabled?: boolean;
};
const EpicIcon: FC<Props> = ({ disabled = false, ...props }) => {
  const color = !disabled ? '#C956FF' : '#77777A';
  const secondaryColor = !disabled ? '#D070FD' : '#A2A2A7';

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
        d="M22 29.1195L30.684 17L35.9471 24.8648L36.9997 48.2013L27.3946 57.8711L22 48.3302V29.1195Z"
        fill={color}
      />
      <path
        d="M26.0784 29.1195L30.6835 17L35.9466 24.8648L30.6835 34.9214L28.1836 35.0503L26.0784 29.1195Z"
        fill={secondaryColor}
      />
      <path
        d="M35.9474 24.8647L30.6843 34.9214L31.4738 50.522L37 48.2012L35.9474 24.8647Z"
        fill={!disabled ? '#B34EE3' : '#636365'}
      />
      <path
        d="M24.1052 29.1196H22V48.3303L26.0789 37.6291L24.1052 29.1196Z"
        fill={!disabled ? '#B34EE3' : '#636365'}
      />
      <path
        d="M26.0791 29.1196H24.1055L26.0791 37.6291L28.1843 35.0504L26.0791 29.1196Z"
        fill={!disabled ? '#D884FF' : '#B5B5B7'}
      />
      <path
        d="M27.3949 54.2609V57.9999L36.9999 48.2012L31.4738 50.5219L27.3949 54.2609Z"
        fill={!disabled ? '#9F44CA' : '#535355'}
      />
      <rect
        x="9"
        y="22.3589"
        width="1"
        height="8"
        transform="rotate(-76.1582 9 22.3589)"
        fill={color}
      />
      <rect
        width="1"
        height="8"
        transform="matrix(-0.239243 -0.97096 -0.97096 0.239243 51.2998 22.3589)"
        fill={color}
      />
      <rect
        x="18.5244"
        y="8.62402"
        width="1"
        height="8"
        transform="rotate(-38.6258 18.5244 8.62402)"
        fill={color}
      />
      <rect x="30" y="2" width="1" height="8" fill={color} />
      <rect
        width="1"
        height="8"
        transform="matrix(-0.781239 -0.624232 -0.624232 0.781239 41.7754 8.62402)"
        fill={color}
      />
      <rect
        x="9.22656"
        y="11.5005"
        width="1"
        height="13.4142"
        transform="rotate(-52.5358 9.22656 11.5005)"
        fill={color}
      />
      <rect
        width="1"
        height="13.4142"
        transform="matrix(-0.608266 -0.793733 -0.793733 0.608266 51.0732 11.5005)"
        fill={color}
      />
    </svg>
  );
};

export default EpicIcon;
