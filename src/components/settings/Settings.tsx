import { FC } from 'react';
import styled from '@emotion/styled';
import SettingsButton from './SettingsButton';
import SettingsToggle from './SettingsToggle';
import usePersistentState from '../../hooks/usePersistentState';
import useHotkey from '../../hooks/useHotkey';

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

const SettingsLink = SettingsButton.withComponent('a');

const Settings: FC = () => {
  const hotkey = useHotkey('show_trophy_hunter');
  const [autoLaunch, setAutoLaunch] = usePersistentState('autoLaunch', true);
  const [trophyNearCompletion, setTrophyNearCompletion] = usePersistentState(
    'trophyNearCompletion',
    true
  );
  const [trophyCompleted, setTrophyCompleted] = usePersistentState(
    'trophyCompleted',
    false
  );

  return (
    <>
      <h2>Settings</h2>
      <Row>
        <Col>
          <h3>General</h3>
          <Setting>
            Show / Hide hotkey{' '}
            <SettingsLink href="overwolf://settings/hotkeys#show_trophy_hunter">
              {hotkey}
            </SettingsLink>
          </Setting>
          <Setting>
            Auto Launch{' '}
            <SettingsToggle
              checked={autoLaunch}
              onChange={(event) => setAutoLaunch(event.target.checked)}
            />
          </Setting>
        </Col>
        <Divider />
        <Col>
          <h3>In-Game Notifications</h3>
          <Setting>
            Trophy near completion{' '}
            <SettingsToggle
              checked={trophyNearCompletion}
              onChange={(event) =>
                setTrophyNearCompletion(event.target.checked)
              }
            />
          </Setting>
          <Setting>
            Trophy completed{' '}
            <SettingsToggle
              checked={trophyCompleted}
              onChange={(event) => setTrophyCompleted(event.target.checked)}
            />
          </Setting>
        </Col>
      </Row>
    </>
  );
};

export default Settings;
