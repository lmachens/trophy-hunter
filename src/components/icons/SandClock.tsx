import { FC, SVGProps } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { bounce } from '../../styles/animations';

const sandClockMotion = keyframes`
  from {
    transform: rotateZ(0deg);
  }

  80% {
    transform: rotateZ(0deg);
  }

  to {
    transform: rotateZ(180deg);
  }
`;

const sandMotion1 = keyframes`
  from {
    opacity: 1;
  }

  80% {
    opacity: 0;
  }

  to {
    opacity: 0;
  }
`;

const sandMotion2 = keyframes`
  from {
    opacity: 0;
  }

  50%: {
    opacity: 1;
  }

  80% {
    opacity: 0;
  }

  to {
    opacity: 0;
  }
`;

const sandMotion3 = keyframes`
  from {
    opacity: 0;
  }

  50$ {
    opacity: 0;
  }

  80% {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

interface FrameProps {
  loading: boolean;
}

const Frame1 = styled.g`
  opacity: 0;
  animation: ${(props: FrameProps) => (props.loading ? sandMotion1 : 'none')} 2s
    ease infinite;
`;
const Frame2 = styled.g`
  opacity: 0;
  animation: ${(props: FrameProps) => (props.loading ? sandMotion2 : 'none')} 2s
    ease infinite;
`;
const Frame3 = styled.g`
  opacity: 0;
  animation: ${(props: FrameProps) => (props.loading ? sandMotion3 : 'none')} 2s
    ease infinite;
`;

const AnimatedSVG = styled.svg`
  animation: ${(props: FrameProps) =>
      props.loading ? sandClockMotion : bounce}
    2s ease infinite;
`;

const SandClock: FC<SVGProps<SVGSVGElement> & FrameProps> = ({
  loading,
  ...props
}) => {
  return (
    <AnimatedSVG
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      loading={loading}
      {...props}
    >
      <path
        d="M14.0495 3.5L9.50001 10.1174L4.95052 3.5L14.0495 3.5Z"
        stroke="#EAEAEA"
      />
      <path
        d="M5.02873 16.5L9.49999 10.8093L13.9713 16.5L5.02873 16.5Z"
        stroke="#EAEAEA"
      />

      <Frame1 loading={loading}>
        <path d="M9.5 17V9.5L7 6H9.5Z" fill="#EAEAEA" />
        <path d="M9.5 17V9.5L12 6H9.5Z" fill="#AFAFAF" />
      </Frame1>
      <Frame2>
        <path d="M9.5 17V9.5L8.5 8H9.5Z" fill="#EAEAEA" />
        <path d="M9.5 17V9.5L10.5 8H9.5Z" fill="#AFAFAF" />
        <path d="M9.5 17V15L5 17H9.5Z" fill="#EAEAEA" />
        <path d="M9.5 17V15L14 17H9.5Z" fill="#AFAFAF" />
      </Frame2>
      <Frame3>
        <path d="M9.5 17V14L5 17H9.5Z" fill="#EAEAEA" />
        <path d="M9.5 17V14L14 17H9.5Z" fill="#AFAFAF" />
      </Frame3>
    </AnimatedSVG>
  );
};

export default SandClock;
