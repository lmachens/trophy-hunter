import { FC } from 'react';
import styled from '@emotion/styled';
import Link from './Link';
import Tooltip from './Tooltip';
import ArrowRight from '../icons/ArrowRight';
import Settings from '../icons/Settings';

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
  background: ${props => (props.active ? '#2B2A30' : '#222')};
  border: none;
  border-bottom: 1px solid #3f3e43;
  cursor: ${props => (props.comingSoon ? 'inherit' : 'pointer')};
  transition: 0.15s;
  opacity: ${props => (props.comingSoon ? 0.4 : 1)};

  :focus {
    outline: none;
  }

  &:hover,
  &:active {
    background-color: ${props => (props.comingSoon ? 'inherit' : '#818c99')};
  }
`;

const Grow = styled.div`
  flex-grow: 1;
`;

const SidebarBottomButton = styled(SidebarButton)`
  border-bottom: none;
  border-top: 1px solid #3f3e43;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
`;

const BottomPartialLeft = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
`;

const BottomPartialRight = styled.div`
  border-left: 1px solid #3f3e43;
  height: 50px;
  padding: 6px;
  display: flex;
  align-items: center;
`;

const Sidebar: FC = () => {
  return (
    <Aside>
      <Link href="/league-of-legends">
        <SidebarButton active>
          <img src="/league-of-legends.png" />
        </SidebarButton>
      </Link>
      <Tooltip title="Coming soon! <3" placement="right">
        <SidebarButton comingSoon>
          <img src="/teamfight-tactics.png" />
        </SidebarButton>
      </Tooltip>
      <Tooltip title="Coming soon! <3" placement="right">
        <SidebarButton comingSoon>
          <img src="/legends-of-runeterra.png" />
        </SidebarButton>
      </Tooltip>
      <Grow />
      <SidebarBottomButton>
        <BottomPartialLeft>
          <img src="/trophies.png" />
        </BottomPartialLeft>
        <BottomPartialRight>
          <ArrowRight />
        </BottomPartialRight>
      </SidebarBottomButton>
      <SidebarBottomButton>
        <BottomPartialLeft>
          <Settings />
        </BottomPartialLeft>
        <BottomPartialRight>
          <ArrowRight />
        </BottomPartialRight>
      </SidebarBottomButton>
    </Aside>
  );
};

export default Sidebar;
