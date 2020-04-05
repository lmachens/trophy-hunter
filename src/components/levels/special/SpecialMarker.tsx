import Marker from '../Marker';
import styled from '@emotion/styled';

const SpecialMarker = styled(Marker)`
  stroke: url(#specialColor);
  fill: url(#specialColor);

  &:hover {
    stroke: url(#specialColorHover);
    fill: url(#specialColorHover);
  }
`;

export default SpecialMarker;
