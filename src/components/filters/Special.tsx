import Filter, { FilterProps } from './Filter';
import Path from './Path';

const Special = (props: Omit<FilterProps, 'title'>) => {
  const color =
    props.selected && !props.disabled ? 'url(#paint0_linear)' : '#77777A';

  return (
    <Filter title="Special" {...props}>
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
          <rect
            x="44.2853"
            y="17.2932"
            width="6.00987"
            height="32.5516"
            transform="rotate(30 44.2853 17.2932)"
            fill={props.selected ? '#EF3FA1' : '#353535'}
          />
          <rect
            x="53.1827"
            y="13.949"
            width="5.97656"
            height="39.8968"
            transform="rotate(30 53.1827 13.949)"
            fill={props.selected ? '#EF7067' : '#504E4E'}
          />
          <rect
            x="60.965"
            y="12.4485"
            width="5.98753"
            height="45.0872"
            transform="rotate(30 60.965 12.4485)"
            fill={props.selected ? '#EF973A' : '#666666'}
          />
          <rect
            x="69.8263"
            y="8.98169"
            width="6.04859"
            height="52.5383"
            transform="rotate(30 69.8263 8.98169)"
            fill={props.selected ? '#FBBA38' : '#77777A'}
          />
          <Path
            d="M69 58H17V49H26L25.878 42.0909H34.5V37H51.561V42.0909H60V49H69V58Z"
            fill={props.selected ? '#C0C0C0' : '#636365'}
          />
          <Path
            d="M17 58H48V42.0909V37H34.439V42.0909H26V49H17V58Z"
            fill={props.selected ? '#E8E8E8' : '#77777A'}
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M27.75 20H26.25V22.25H24V23.75H26.25V26H27.75V23.75H30V22.25H27.75V20Z"
            fill={props.selected ? '#EF1ACD' : '#C4C4C4'}
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M48.5 63H47.5V64.5H46V65.5H47.5V67H48.5V65.5H50V64.5H48.5V63Z"
            fill={props.selected ? '#EF874D' : '#C4C4C4'}
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M74.5 33H73.5V34.5H72V35.5H73.5V37H74.5V35.5H76V34.5H74.5V33Z"
            fill={props.selected ? '#FBBA38' : '#C4C4C4'}
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="-0.875"
            y1="0.999999"
            x2="102.825"
            y2="96.2465"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#EF1ACD" />
            <stop offset="1" stopColor="#EFB31A" />
          </linearGradient>
          <clipPath id="clip0">
            <rect
              width="60"
              height="60"
              fill="white"
              transform="translate(16 8)"
            />
          </clipPath>
        </defs>
      </svg>
    </Filter>
  );
};

export default Special;
