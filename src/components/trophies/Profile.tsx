import { FC } from 'react';
import styled from '@emotion/styled';
import { useAccount } from '../../contexts/account';
import { useMutation, queryCache, useQuery } from 'react-query';
import { postLogin, postReset } from '../../api/accounts';
import Button from '../common/Button';
import { getRecentVersion } from '../../api/riot';
import * as trophies from './index';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 8px;
  border: 1px solid #eaeaea;
`;

const Profile: FC = () => {
  const { account } = useAccount();
  const { data: version } = useQuery('version', getRecentVersion);

  const [login] = useMutation(postLogin, {
    onSuccess: () => {
      queryCache.refetchQueries('account');
    },
  });
  const [reset] = useMutation(postReset, {
    onSuccess: () => {
      queryCache.refetchQueries('account');
    },
  });

  return (
    <Container>
      <Avatar
        src={
          version && account
            ? `https://ddragon.leagueoflegends.com/cdn/${version.riot}/img/profileicon/${account.summoner.profileIconId}.png`
            : `${process.env.PUBLIC_DIR}/unknown.png`
        }
      />
      <div>
        <h4>{account?.summoner.name || 'Unknown Trophy Hunter'}</h4>
        <p>
          {account
            ? account.trophies.filter((trophy) => trophy.status === 'completed')
                .length
            : 0}
          /{Object.keys(trophies).length} Trophies
        </p>
      </div>
      {!account && (
        <Button
          onClick={() => {
            login({
              summonerName: 'sirlunchalot619',
              platformId: 'EUW1',
            });
          }}
        >
          Login
        </Button>
      )}
      {account && (
        <Button
          onClick={() => {
            reset();
          }}
        >
          Reset
        </Button>
      )}
    </Container>
  );
};

export default Profile;
