import { FC } from 'react';
import { AppHeader } from '../components/headers';
import styled from '@emotion/styled';
import { Sidebar } from '../components/sidebar';
import { ToolPane } from '../components/tools';
import { Settings } from '../components/settings';
import Collection from '../components/tools/collection';

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  position: relative;
`;

interface GameLayoutProps {
  activeTool: 'settings' | 'collection';
  onToolClick(tool: 'settings' | 'collection'): void;
}

const GameLayout: FC<GameLayoutProps> = ({
  children,
  activeTool,
  onToolClick,
}) => {
  return (
    <>
      <AppHeader />
      <Sidebar activeTool={activeTool} onToolClick={onToolClick} />
      <Main>
        {children}
        {activeTool && (
          <ToolPane>
            {activeTool === 'settings' && <Settings />}
            {activeTool === 'collection' && <Collection />}
          </ToolPane>
        )}
      </Main>
    </>
  );
};

export default GameLayout;
