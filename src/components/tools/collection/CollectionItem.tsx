import { ComponentType, FC } from 'react';
import { ProgressProps } from '../../trophies/types';
import styled from '@emotion/styled';

interface CollectionItemProps {
  title: string;
  Progress: ComponentType<ProgressProps>;
  trophiesMax: number;
  trophiesCount: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100px;

  > svg {
    height: 80px;
    width: auto;

    > path {
      stroke-width: 6px;
    }
  }
`;

const CollectionItem: FC<CollectionItemProps> = ({
  title,
  Progress,
  trophiesMax,
  trophiesCount = 0
}) => {
  return (
    <Container>
      <div>{title}</div>
      <small>
        {trophiesCount}/{trophiesMax}
      </small>
      <Progress progress={trophiesCount / trophiesMax} />
    </Container>
  );
};

export default CollectionItem;
