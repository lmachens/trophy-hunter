import Background from './Background';
import LogoContainer from './LogoContainer';
import Logo from './Logo';
import Toolbar from './Toolbar';
import MinimizeButton from './MinimizeButton';
import MovableHeader from './MovableHeader';
import styled from '@emotion/styled';
import useHotkey from '../../hooks/useHotkey';

const Hotkey = styled.span`
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Hint = styled.span`
  color: #77777a;
  margin-right: 4px;
`;

const InGameHeader = () => {
  const hotkey = useHotkey();

  return (
    <MovableHeader>
      <LogoContainer>
        <Logo
          src={`${process.env.PUBLIC_DIR}/trophy-hunter-logo.png`}
          draggable={false}
        />
        <Background viewBox="0 0 200 48" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H200V30H200L183 48H0V0Z" />
        </Background>
      </LogoContainer>
      <Toolbar>
        <Hotkey>
          <Hint>Show/Hide</Hint>
          {hotkey}
        </Hotkey>
        <MinimizeButton />
      </Toolbar>
    </MovableHeader>
  );
};

export default InGameHeader;
