import { AppHeader } from '../components/headers';
import styled from '@emotion/styled';
import { Sidebar } from '../components/sidebar';
import { ToolPane } from '../components/tools';
import { Settings } from '../components/settings';
import Collection from '../components/tools/collection';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { VideoAds } from '../components/ads';
import Profile from '../components/trophies/Profile';
import { ReactNode } from 'react';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  position: relative;
  overflow: hidden;

  nav {
    position: absolute;
    right: 20px;
    top: 45px;
  }
`;

const Side = styled.aside`
  width: 440px;
  padding: 48px 20px 20px 20px;
  background: #1f1f1f;
  border-left: 1px solid #77777a;
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

type Props = {
  activeTool: 'settings' | 'collection';
  aside: ReactNode;
  children: ReactNode;
  onToolClick(tool: 'settings' | 'collection'): void;
  onMainClick(): void;
};

const GameLayout = ({
  children,
  aside,
  activeTool,
  onMainClick,
  onToolClick,
}: Props) => {
  return (
    <Container>
      <AppHeader />
      <Sidebar activeTool={activeTool} onToolClick={onToolClick} />
      <Main onClick={onMainClick}>
        <ErrorBoundary grid>{children}</ErrorBoundary>
      </Main>
      <Side>
        <ErrorBoundary grid>
          <Profile />
          {aside}
          <VideoAds />
        </ErrorBoundary>
      </Side>
      {activeTool && (
        <ToolPane>
          {activeTool === 'settings' && <Settings />}
          {activeTool === 'collection' && <Collection />}
        </ToolPane>
      )}
    </Container>
  );
};

export default GameLayout;
