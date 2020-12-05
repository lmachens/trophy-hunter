import Filter, { FilterProps } from './Filter';
import Path from './Path';

const Skills = (props: Omit<FilterProps, 'title'>) => {
  const color = props.selected && !props.disabled ? '#FBFF2E' : '#77777A';

  return (
    <Filter title="Skills" {...props}>
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
          d="M44.3857 51.6767L44.5339 48.0257L46.8945 45.9995L49.3857 48.1767L49.3857 51.4999M44.3857 51.6767L43.8857 55.9999L47.0322 53.5028L49.8857 55.9999L49.3857 51.4999M44.3857 51.6767L47.0322 49.4999L49.3857 51.4999"
          stroke={color}
        />
        <Path
          d="M27.4996 34.5002L46.9996 42.0002L65.4996 34.5002"
          stroke="#3F3E43"
        />
        <Path
          d="M46.3857 27L46.3857 13.7441L47.3857 13.7441L47.3857 27L46.3857 27Z"
          fill={color}
        />
        <Path
          d="M45.9998 42.0002L45.9996 22.4999L36.4738 26.4999L26.0829 34.9999L29.0005 36L34.0005 37.5L45.9998 42.0002Z"
          fill="#3F3E43"
        />
        <Path
          d="M27.7631 35.5638L22.433 34.7959L22.75 33.2469L27.2141 33.5148L36.4952 24.4395L47.1284 22.0039L58.5657 26.2123L65.976 33.3773L68.891 33.3283L69.007 35.1273L65.409 35.3594L57.5657 27.9443L47.1284 24.0039L37.0442 26.4885L27.7631 35.5638Z"
          fill="#525058"
        />
        <rect
          x="46.3857"
          y="45.9999"
          width="20"
          height="1"
          transform="rotate(-90 46.3857 45.9999)"
          fill={color}
        />
        <rect
          x="46.3857"
          y="63"
          width="6"
          height="1"
          transform="rotate(-90 46.3857 63)"
          fill={color}
        />
        <rect
          x="49.3857"
          y="67"
          width="6"
          height="1"
          transform="rotate(-90 49.3857 67)"
          fill={color}
        />
        <rect
          x="43.3857"
          y="67"
          width="6"
          height="1"
          transform="rotate(-90 43.3857 67)"
          fill={color}
        />
        <Path
          d="M46.8857 9L49.9168 14.25L43.8547 14.25L46.8857 9Z"
          fill={color}
        />
      </svg>
    </Filter>
  );
};

export default Skills;
