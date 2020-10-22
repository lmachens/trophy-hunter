import styled from '@emotion/styled';
import { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';

interface SizeProps {
  zoom: number;
}

const Container = styled.div`
  transform-origin: top left;
  transform: scale(${(props: SizeProps) => props.zoom});
`;

const ZoomToFit: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const ref = useRef<HTMLDivElement>();
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const calcZoom = () => {
      const xRatio =
        ref.current.parentElement.offsetWidth / ref.current.offsetWidth;
      const yRatio =
        ref.current.parentElement.offsetHeight / ref.current.offsetHeight;
      setZoom(Math.min(xRatio, yRatio));
    };
    window.addEventListener('resize', calcZoom);
    calcZoom();

    return () => {
      window.removeEventListener('resize', calcZoom);
    };
  }, [ref]);
  return <Container ref={ref} zoom={zoom} {...props} />;
};

export default ZoomToFit;
