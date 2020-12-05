import Filter, { FilterProps } from './Filter';
import Path from './Path';

const Favorites = (props: Omit<FilterProps, 'title'>) => {
  const color = props.selected && !props.disabled ? '#EF1ACD' : '#77777A';
  const secondaryColor =
    props.selected && !props.disabled ? '#CB13AE' : '#636365';
  return (
    <Filter title="Favorites" {...props}>
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
          d="M46 17L50.7148 31.5106H65.9722L53.6287 40.4787L58.3435 54.9894L46 46.0213L33.6565 54.9894L38.3713 40.4787L26.0278 31.5106H41.2852L46 17Z"
          fill={color}
        />
        <Path
          d="M46 17L50.7148 31.5106H65.9722L53.6287 40.4787L58.3435 54.9894L46 46.0213L46 31.5106L46 17Z"
          fill={secondaryColor}
        />
        <Path
          d="M35.2426 22.2426L34.583 20.9479L35.6104 19.9205L34.1752 20.1478L33.5156 18.8531L33.2882 20.2883L31.8531 20.5156L33.1478 21.1753L32.9204 22.6104L33.9479 21.583L35.2426 22.2426Z"
          fill={color}
        />
        <Path
          d="M29.2426 41.4142L27.9479 42.0739L26.9205 41.0464L27.1478 42.4816L25.8531 43.1413L27.2883 43.3686L27.5156 44.8038L28.1753 43.5091L29.6104 43.7364L28.583 42.7089L29.2426 41.4142Z"
          fill={color}
        />
        <Path
          d="M58.4142 25.5858L57.1195 26.2455L56.092 25.218L56.3193 26.6532L55.0246 27.3129L56.4598 27.5402L56.6871 28.9754L57.3468 27.6807L58.782 27.908L57.7545 26.8805L58.4142 25.5858Z"
          fill={color}
        />
      </svg>
    </Filter>
  );
};

export default Favorites;
