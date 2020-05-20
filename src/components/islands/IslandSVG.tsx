import styled from '@emotion/styled';

interface IslandSVGProps {
  status: 'open' | 'done' | 'closed';
}

const IslandSVG = styled.svg<IslandSVGProps>`
  opacity: ${(props) => (props.status === 'closed' ? 0.4 : 1)};
`;

export default IslandSVG;
