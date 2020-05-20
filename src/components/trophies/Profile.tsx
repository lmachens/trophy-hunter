import { FC } from 'react';
import styled from '@emotion/styled';
import { useAccount } from '../../contexts/account';
import { useMutation, queryCache } from 'react-query';
import { postLogin } from '../../api/accounts';

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
  const { account, loading } = useAccount();
  const [login] = useMutation(postLogin, {
    onSuccess: () => {
      queryCache.refetchQueries('account');
    },
  });

  return (
    <Container
      onClick={() => {
        login({
          summonerName: 'sirlunchalot619',
          region: 'EUW',
        });
      }}
    >
      <Avatar src={`${process.env.PUBLIC_DIR}/avatar.png`} />
      <div>
        <h4>
          {loading ? '. . .' : account?.summonerName || 'Unknown Trophy Hunter'}
        </h4>
        <p>
          {account
            ? account.trophies.filter((trophy) => trophy.status === 'completed')
                .length
            : 0}
          /217 TH points
        </p>
      </div>
    </Container>
  );
};

export default Profile;
