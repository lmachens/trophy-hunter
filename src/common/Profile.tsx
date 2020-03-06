import { FC } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 8px;
`;

const Profile: FC = () => {
  return (
    <Container>
      <Avatar src="/avatar.png" />
      <div>
        <div>sirlunchalot619</div>
        <small>24/217 Points</small>
      </div>
    </Container>
  );
};

export default Profile;
