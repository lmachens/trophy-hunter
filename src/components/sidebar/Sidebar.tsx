import { FC } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
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

interface SidebarLinkProps {
  active?: boolean;
  comingSoon?: boolean;
}

const SidebarLink = styled.a<SidebarLinkProps>`
  display: grid;
  place-items: center;
  height: 75px;
  width: 100%;
  background: ${(props) => (props.active ? '#2B2A30' : '#222')};
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
      <Link href="/league-of-legends?subpage=map" passHref>
        <SidebarLink active>
          <img src={`${process.env.PUBLIC_DIR}/league-of-legends.png`} />
        </SidebarLink>
      </Link>
      <Tooltip title="Coming soon! <3" placement="right">
        <SidebarLink comingSoon>
          <img src={`${process.env.PUBLIC_DIR}/teamfight-tactics.png`} />
        </SidebarLink>
      </Tooltip>
      <Tooltip title="Coming soon! <3" placement="right">
        <SidebarLink comingSoon>
          <img src={`${process.env.PUBLIC_DIR}/legends-of-runeterra.png`} />
        </SidebarLink>
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
