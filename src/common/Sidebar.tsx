import { FC } from 'react';
import styled from '@emotion/styled';
import Link from './Link';

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
}

const SidebarButton = styled.button<SidebarButtonProps>`
  height: 75px;
  width: 100%;
  background: ${props => (props.active ? '#2B2A30' : '#222')};
  border: none;
  border-bottom: 1px solid #3f3e43;
  cursor: pointer;
  transition: 0.15s;

  :focus {
    outline: none;
  }

  &:hover,
  &:active {
    background-color: #818c99;
  }
`;

const Grow = styled.div`
  flex-grow: 1;
`;

const SidebarBottomButton = styled(SidebarButton)`
  border-bottom: none;
  border-top: 1px solid #3f3e43;
`;

const Sidebar: FC = () => {
  return (
    <Aside>
      <Link href="/league-of-legends">
        <SidebarButton active>
          <img src="/league-of-legends.png" />
        </SidebarButton>
      </Link>
      <Link href="/teamfight-tactics">
        <SidebarButton>
          <img src="/teamfight-tactics.png" />
        </SidebarButton>
      </Link>
      <Link href="/legends-of-runeterra">
        <SidebarButton>
          <img src="/legends-of-runeterra.png" />
        </SidebarButton>
      </Link>
      <Grow />
      <SidebarBottomButton>
        <img src="/trophies.png" />
      </SidebarBottomButton>
    </Aside>
  );
};

export default Sidebar;
