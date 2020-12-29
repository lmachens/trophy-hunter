import React from 'react';
import Link from 'next/link';
import IconButton from './IconButton';
import MapIcon from '../icons/Map';
import LeaderboardIcon from '../icons/Leaderboard';
import HistoryIcon from '../icons/History';
import styled from '@emotion/styled';
import { Tooltip } from '../tooltip';
import { useRouter } from 'next/router';

const Nav = styled.nav`
  display: flex;
`;

const NavIconButton = styled(IconButton)`
  width: 30px;
  height: 30px;
  border: ${(props) => (props.active ? '1px solid #EAEAEA' : 'none')};
  background: ${(props) => (props.active ? '#616165' : '#3f3e43')};
`;

const SubpageNav = () => {
  const router = useRouter();
  const { subpage = 'map' } = router.query;

  return (
    <Nav onClick={(event) => event.stopPropagation()}>
      <Tooltip title="Map" placement="top">
        <div>
          <Link
            href={{
              pathname: '/league-of-legends',
              query: {
                subpage: 'map',
              },
            }}
            passHref
          >
            <NavIconButton as="a" active={subpage === 'map'}>
              <MapIcon />
            </NavIconButton>
          </Link>
        </div>
      </Tooltip>
      <Tooltip title="Leaderboard" placement="top">
        <div>
          <Link
            href={{
              pathname: '/league-of-legends',
              query: {
                subpage: 'leaderboard',
              },
            }}
            passHref
          >
            <NavIconButton as="a" active={subpage === 'leaderboard'}>
              <LeaderboardIcon />
            </NavIconButton>
          </Link>
        </div>
      </Tooltip>
      <Tooltip title="History" placement="top">
        <div>
          <Link
            href={{
              pathname: '/league-of-legends',
              query: {
                subpage: 'history',
              },
            }}
            passHref
          >
            <NavIconButton disabled as="a" active={subpage === 'history'}>
              <HistoryIcon />
            </NavIconButton>
          </Link>
        </div>
      </Tooltip>
    </Nav>
  );
};

export default SubpageNav;
