import styled from '@emotion/styled';
import HeartSquid from '../icons/HeartSquid';
import CopyLink from './CopyLink';

const Container = styled.section`
  display: grid;
  justify-items: center;

  svg {
    margin: 30px 0;
  }
`;

const SpreadTheLove = () => {
  return (
    <Container>
      <h2>Spread The Love!</h2>
      <p>Let your friends join the fun as well!</p>
      <HeartSquid />
      <CopyLink />
    </Container>
  );
};

export default SpreadTheLove;
