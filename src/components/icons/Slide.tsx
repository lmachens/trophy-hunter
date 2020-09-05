import { FC, SVGProps } from 'react';

interface SlideProps extends SVGProps<SVGSVGElement> {
  active: boolean;
}
const Slide: FC<SlideProps> = ({ active, ...props }) => (
  <svg
    width="6"
    height="6"
    viewBox="0 0 6 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="0.5"
      y="0.500122"
      width="5"
      height="5"
      fill={active ? '#EAEAEA' : 'none'}
      stroke="#77777A"
    />
  </svg>
);

export default Slide;
