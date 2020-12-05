import Filter, { FilterProps } from './Filter';
import Path from './Path';

const Objectives = (props: Omit<FilterProps, 'title'>) => {
  const color = props.selected && !props.disabled ? '#0F8CFF' : '#77777A';

  return (
    <Filter title="Objectives" {...props}>
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
        <g clipPath="url(#clip0)">
          <Path
            d="M50.1446 14.0167L43.7789 28.0144L56.1939 29.6916L61.469 20.5548L50.1446 14.0167Z"
            fill={color}
          />
          <Path
            d="M59.0675 21.7426L61.4688 20.5552L56.1194 29.8207L54.6097 29.4638L59.0675 21.7426Z"
            fill="#0963B7"
          />
          <Path
            d="M74.2826 32.2421L59.0684 21.7424L53.719 31.0078L74.2826 32.2421Z"
            fill={props.selected ? '#0B6ECA' : '#636365'}
          />
          <rect
            x="45.9337"
            y="11.1647"
            width="2.6747"
            height="53.1968"
            transform="rotate(24.8918 45.9337 11.1647)"
            fill="#46444B"
          />
          <Path
            d="M25 26L25.8103 28.1897L28 29L25.8103 29.8103L25 32L24.1897 29.8103L22 29L24.1897 28.1897L25 26Z"
            fill={color}
          />
          <Path
            d="M50 41L50.8103 43.1897L53 44L50.8103 44.8103L50 47L49.1897 44.8103L47 44L49.1897 43.1897L50 41Z"
            fill={color}
          />
          <Path
            d="M64 9L64.8103 11.1897L67 12L64.8103 12.8103L64 15L63.1897 12.8103L61 12L63.1897 11.1897L64 9Z"
            fill={color}
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect
              width="60"
              height="60"
              fill="white"
              transform="translate(16 9)"
            />
          </clipPath>
        </defs>
      </svg>
    </Filter>
  );
};

export default Objectives;
