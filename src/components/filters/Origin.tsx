import { FC } from 'react';
import Filter, { FilterProps } from './Filter';

const Origin: FC<Omit<FilterProps, 'title'>> = (props) => {
  const color = props.selected ? '#EAEAEA' : '#77777A';

  return (
    <Filter title="Origin" {...props}>
      <svg
        width="92"
        height="92"
        viewBox="0 0 92 92"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 1L1 12.7692V81.3077L10 91H82L91 81.3077V12.7692L82 1H10Z"
          stroke={color}
        />
        <path
          d="M42.9904 20H47.0533H51.5224L61.2732 33.3939L62.0857 46.7879L56.804 55.8485L51.5224 59H42.9904L36.8962 55.8485L32 46.7879L32.8334 33.3939L42.9904 20Z"
          fill={color}
        />
        <path
          d="M47.0429 36.38V20H51.5151L61.2726 33.3939L62.0857 46.7879L56.8004 55.8485L51.5151 59H47.0428L47.0429 47.69L47.0429 36.38Z"
          fill={props.selected ? '#C4C4C4' : '#636365'}
        />
        <path
          d="M51.7931 31.7001L61.5286 36.7143V39.5L50.3857 33.3715L47.0429 37.8286L42.6882 34.0401H37.1461L43.7 32.2572L47.0429 35.6L49.4179 30.1401L51.7931 31.7001Z"
          fill="#3F3E43"
        />
        <rect
          x="38.4142"
          y="47"
          width="2"
          height="2"
          transform="rotate(45 38.4142 47)"
          fill="#2B2A30"
        />
        <rect
          x="41.4142"
          y="50"
          width="2"
          height="2"
          transform="rotate(45 41.4142 50)"
          fill="#2B2A30"
        />
        <rect
          x="43.4142"
          y="44"
          width="2"
          height="2"
          transform="rotate(45 43.4142 44)"
          fill="#2B2A30"
        />
        <rect
          x="28.4142"
          y="33"
          width="2"
          height="2"
          transform="rotate(45 28.4142 33)"
          fill={color}
        />
        <rect
          x="36.4142"
          y="16"
          width="2"
          height="2"
          transform="rotate(45 36.4142 16)"
          fill={color}
        />
        <rect
          x="29.1214"
          y="22"
          width="3"
          height="3"
          transform="rotate(45 29.1214 22)"
          fill={color}
        />
      </svg>
    </Filter>
  );
};

export default Origin;
