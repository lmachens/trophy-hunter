import React from 'react';
import Link from 'next/link';
import MapIcon from '../icons/Map';
import LeaderboardIcon from '../icons/Leaderboard';
import HistoryIcon from '../icons/History';
import styled from '@emotion/styled';
import { Tooltip } from '../tooltip';
import { useRouter } from 'next/router';
import useVersion from '../../hooks/useVersion';
import NavIconButton from './NavIconButton';
import FancyButton from './FancyButton';

const Nav = styled.nav`
  display: flex;
`;

const BackButton = styled(FancyButton)`
  margin: 0;
  text-decoration: none;
  text-transform: initial;

  :active {
    text-decoration: none;
  }
`;

const SubpageNav = () => {
  const router = useRouter();
  const { season: currentSeason } = useVersion();

  const { subpage = 'map' } = router.query;

  return (
    <Nav onClick={(event) => event.stopPropagation()}>
      {subpage === 'profile' ? (
        <Link
          href={{
            pathname: '/league-of-legends',
            query: {
              subpage: 'leaderboard',
            },
          }}
          passHref
        >
          <BackButton as="a">Back to leaderboard</BackButton>
        </Link>
      ) : (
        <>
          <Tooltip title="Map" placement="top">
            <div>
              <Link
                href={{
                  pathname: '/league-of-legends',
                  query: {
                    ...router.query,
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
                    ...router.query,
                    subpage: 'leaderboard',
                    season: currentSeason,
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
                    ...router.query,
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
        </>
      )}
    </Nav>
  );
};

export default SubpageNav;
