import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { getRecentVersion } from '../../api/riot';
import { useTargetAccount } from '../../contexts/account';
import { Tooltip } from '../tooltip';
import * as trophies from './index';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 8px;
  border: 1px solid #eaeaea;
`;

const Profile = () => {
  const account = useTargetAccount();
  const { data: version } = useQuery('version', getRecentVersion);

  return (
    <Container>
      <Avatar
        src={
          version && account && account.summoner.profileIconId !== undefined
            ? `https://ddragon.leagueoflegends.com/cdn/${version.riot}/img/profileicon/${account.summoner.profileIconId}.png`
            : `${process.env.PUBLIC_DIR}/unknown.png`
        }
        alt=""
      />
      <div>
        <h4>{account?.summoner.name || 'Start LoL to Sign-In'}</h4>
        <p>
          <span>
            {account
              ? account.trophies.filter(
                  (trophy) => trophy.status === 'completed'
                ).length
              : 0}
            /{Object.keys(trophies).length} Trophies
          </span>{' '}
          |{' '}
          <Tooltip
            text="Missions are random trophies which are shuffled every Sunday. They are not part of the trophies count."
            placement="top"
          >
            <span>{account?.missionTrophiesCompleted || 0} Missions</span>
          </Tooltip>
        </p>
      </div>
    </Container>
  );
};

export default Profile;
