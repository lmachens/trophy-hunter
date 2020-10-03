import { FC } from 'react';
import Filter, { FilterProps } from './Filter';

const Teamwork: FC<Omit<FilterProps, 'title'>> = (props) => {
  const color = props.selected ? '#07EF1E' : '#77777A';

  return (
    <Filter title="Teamwork" {...props}>
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
          d="M19 48L21.5 34H34.5L44 31L47.5 32.5V38.5L61.5 54L58 57.5L56.5 56L50 49L56 56.5L53.5 59L48.5 55L52.5 59L50 61L46.5 58.5L48.1 60.5L46.5 62.5L37.5 57L27 51L19 48Z"
          fill={props.selected ? '#01FF1A' : '#77777A'}
        />
        <path
          d="M46.5 62.5L37.5 57L47.5 38.5L61.5 54L58 57.5L56.5 56L50 49L56 56.5L53.5 59L48.5 55L52.5 59L50 61L46.5 58.5L48.1 60.5L46.5 62.5Z"
          fill={props.selected ? '#04D719' : '#636365'}
        />
        <path
          d="M36.5 42L48.5 30.5L58.5 34L73 33.5L74 48L67.5 49.5L61.5 54L48 39L39.5 45L36.5 42Z"
          fill="#3F3E43"
        />
        <path d="M31 47.5L28 52L31 54L33.5 49.5L31 47.5Z" fill="#525058" />
        <path
          d="M36.5 48.5L31.5 54.5L34.5 57L39.5 51L36.5 48.5Z"
          fill="#525058"
        />
        <path
          d="M40.5 52L35.5 57.5L38.5 59.5L43 54.5L40.5 52Z"
          fill="#525058"
        />
        <path d="M43 56L39.5 60L42 62L45.5 58.5L43 56Z" fill="#525058" />
        <path
          d="M46.0404 16.4549V23L41 18.475V16.6973L42.2195 15.0004H44.6584L46.0404 16.4549Z"
          fill={props.selected ? '#01FF1A' : '#77777A'}
        />
        <path
          d="M45.96 16.4545V22.9996L51.0004 18.4746V16.6969L49.781 15H47.342L45.96 16.4545Z"
          fill={props.selected ? '#01FF1A' : '#77777A'}
        />
      </svg>
    </Filter>
  );
};

export default Teamwork;
