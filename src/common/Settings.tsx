import { FC } from 'react';
import styled from '@emotion/styled';
import SettingsButton from './SettingsButton';
import SettingsToggle from './SettingsToggle';

const Row = styled.div`
  display: flex;
`;

const Col = styled.div`
  padding: 0px 12px;
`;

const Divider = styled.div`
  width: 1px;
  background: #3f3e43;
  margin: 0px 12px;
`;

const Setting = styled.div`
  margin: 7px 0px;
  display: flex;
  justify-content: space-between;
  min-width: 240px;
`;

const Settings: FC = () => {
  return (
    <>
      <h2>Settings</h2>
      <Row>
        <Col>
          <h3>General</h3>
          <Setting>
            Show / Hide hotkey <SettingsButton>Ctrl+H</SettingsButton>
          </Setting>
          <Setting>
            Auto Launch <SettingsToggle />
          </Setting>
        </Col>
        <Divider />
        <Col>
          <h3>In-Game Notifications</h3>
          <Setting>
            Trophy near completion <SettingsToggle />
          </Setting>
          <Setting>
            Trophy completed <SettingsToggle />
          </Setting>
        </Col>
      </Row>
    </>
  );
};

export default Settings;
