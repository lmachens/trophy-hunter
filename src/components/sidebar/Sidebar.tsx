import { FC } from 'react';
import styled from '@emotion/styled';
import Link from '../common/Link';
import { Tooltip } from '../tooltip';
import Settings from '../icons/Settings';
import ToolButton from '../tools/ToolButton';
import Grow from '../common/Grow';

const Aside = styled.aside`
  width: 75px;
  padding-top: 48px;
  background: #222;
  border-right: 1px solid #3f3e43;
  display: flex;
  flex-direction: column;
`;

interface SidebarButtonProps {
  active?: boolean;
  comingSoon?: boolean;
}

const SidebarButton = styled.button<SidebarButtonProps>`
  height: 75px;
  width: 100%;
  background: ${(props) => (props.active ? '#2B2A30' : '#222')};
  border: none;
  border-bottom: 1px solid #3f3e43;
  cursor: ${(props) => (props.comingSoon ? 'inherit' : 'pointer')};
  transition: 0.15s;
  opacity: ${(props) => (props.comingSoon ? 0.4 : 1)};

  :focus {
    outline: none;
  }

  &:hover,
  &:active {
    background-color: ${(props) => (props.comingSoon ? 'inherit' : '#818c99')};
  }
`;

interface SidebarProps {
  activeTool: 'settings' | 'collection';
  onToolClick(tool: 'settings' | 'collection'): void;
}

const Sidebar: FC<SidebarProps> = ({ activeTool, onToolClick }) => {
  return (
    <Aside>
      <Link href="/league-of-legends?subpage=map">
        <SidebarButton active>
          <img src={`${process.env.PUBLIC_DIR}/league-of-legends.png`} />
        </SidebarButton>
      </Link>
      <Tooltip title="Coming soon! <3" placement="right">
        <SidebarButton comingSoon>
          <img src={`${process.env.PUBLIC_DIR}/teamfight-tactics.png`} />
        </SidebarButton>
      </Tooltip>
      <Tooltip title="Coming soon! <3" placement="right">
        <SidebarButton comingSoon>
          <img src={`${process.env.PUBLIC_DIR}/legends-of-runeterra.png`} />
        </SidebarButton>
      </Tooltip>
      <Grow />
      <ToolButton
        icon={<img src={`${process.env.PUBLIC_DIR}/trophies.png`} />}
        active={activeTool === 'collection'}
        onClick={() => onToolClick('collection')}
      />
      <ToolButton
        icon={<Settings />}
        active={activeTool === 'settings'}
        onClick={() => onToolClick('settings')}
      />
    </Aside>
  );
};

export default Sidebar;
