import { FC, SVGProps } from 'react';
import styled from '@emotion/styled';

interface FavoritesFilterProps extends SVGProps<SVGSVGElement> {
  active?: boolean;
}

const SVG = styled.svg<FavoritesFilterProps>`
  fill: ${(props) => (props.active ? '#77777A' : '#1F1F1F')};
  stroke: #77777a;

  &:hover {
    fill: #3f3e43;
  }
`;

const FavoritesFilter: FC<FavoritesFilterProps> = (props) => {
  return (
    <SVG
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M10 2L11.7961 7.52786H17.6085L12.9062 10.9443L14.7023 16.4721L10 13.0557L5.29772 16.4721L7.09383 10.9443L2.39155 7.52786H8.20389L10 2Z" />
    </SVG>
  );
};

export default FavoritesFilter;
