import styled from '@emotion/styled';

const Path = styled.path`
  fill: ${(props) => props.fill || 'inherit'};
  stroke: ${(props) => props.stroke || 'inherit'};
  transition: 0.15s;
`;

export default Path;
