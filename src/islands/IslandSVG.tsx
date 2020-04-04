import styled from '@emotion/styled';
import { IslandProps } from './utils';

const IslandSVG = styled.svg<IslandProps>`
  opacity: ${props => (props.status === 'closed' ? 0.4 : 1)};
`;

export default IslandSVG;
