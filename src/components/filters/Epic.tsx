import Filter, { FilterProps } from './Filter';
import Path from './Path';

const Epic = (props: Omit<FilterProps, 'title'>) => {
  const color = props.selected && !props.disabled ? '#C956FF' : '#77777A';
  const secondaryColor =
    props.selected && !props.disabled ? '#D070FD' : '#A2A2A7';

  return (
    <Filter title="Epic" {...props}>
      <svg
        width="92"
        height="92"
        viewBox="0 0 92 92"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M10 1L1 12.7692V81.3077L10 91H82L91 81.3077V12.7692L82 1H10Z"
          stroke={color}
        />
        <Path
          d="M38 37.1195L46.684 25L51.9471 32.8648L52.9997 56.2013L43.3946 65.8711L38 56.3302V37.1195Z"
          fill={color}
        />
        <Path
          d="M42.0784 37.1195L46.6835 25L51.9466 32.8648L46.6835 42.9214L44.1836 43.0503L42.0784 37.1195Z"
          fill={secondaryColor}
        />
        <Path
          d="M51.9473 32.8647L46.6843 42.9214L47.4738 58.522L52.9999 56.2012L51.9473 32.8647Z"
          fill={props.selected ? '#B34EE3' : '#636365'}
        />
        <Path
          d="M40.1052 37.1196H38V56.3303L42.0789 45.629L40.1052 37.1196Z"
          fill={props.selected ? '#B34EE3' : '#636365'}
        />
        <Path
          d="M42.0791 37.1196H40.1055L42.0791 45.6291L44.1844 43.0504L42.0791 37.1196Z"
          fill={props.selected ? '#D884FF' : '#B5B5B7'}
        />
        <Path
          d="M43.3949 62.2609V65.9999L52.9999 56.2012L47.4738 58.5219L43.3949 62.2609Z"
          fill={props.selected ? '#9F44CA' : '#535355'}
        />
        <rect
          x="25"
          y="30.3589"
          width="1"
          height="8"
          transform="rotate(-76.1582 25 30.3589)"
          fill={color}
        />
        <rect
          width="1"
          height="8"
          transform="matrix(-0.239243 -0.97096 -0.97096 0.239243 67.2998 30.3589)"
          fill={color}
        />
        <rect
          x="34.5244"
          y="16.624"
          width="1"
          height="8"
          transform="rotate(-38.6258 34.5244 16.624)"
          fill={color}
        />
        <rect x="46" y="10" width="1" height="8" fill={color} />
        <rect
          width="1"
          height="8"
          transform="matrix(-0.781239 -0.624232 -0.624232 0.781239 57.7754 16.624)"
          fill={color}
        />
        <rect
          x="25.2266"
          y="19.5005"
          width="1"
          height="13.4142"
          transform="rotate(-52.5358 25.2266 19.5005)"
          fill={color}
        />
        <rect
          width="1"
          height="13.4142"
          transform="matrix(-0.608266 -0.793733 -0.793733 0.608266 67.0732 19.5005)"
          fill={color}
        />
      </svg>
    </Filter>
  );
};

export default Epic;
