import { FC } from 'react';
import styled from '@emotion/styled';
import SettingsButton from './SettingsButton';
import SettingsToggle from './SettingsToggle';
import usePersistentState from '../../hooks/usePersistentState';
import useHotkey from '../../hooks/useHotkey';

const Row = styled.div`
  display: flex;
  overflow: auto;
`;

const Col = styled.div`
  padding: 0px 12px;
  min-width: 240px;
`;

const Divider = styled.div`
  width: 1px;
  min-width: 1px;
  background: #3f3e43;
  margin: 0px 12px;
`;

const Setting = styled.div`
  margin: 7px 0px;
  display: flex;
  justify-content: space-between;
`;

const SettingsLink = SettingsButton.withComponent('a');

const Settings: FC = () => {
  const showTrophyHunterHotkey = useHotkey('show_trophy_hunter');
  const nextPageHotkey = useHotkey('next_page_trophy_hunter');
  const showSecondScreenHotkey = useHotkey('show_second_screen_trophy_hunter');
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
            Show / Hide hotkey
            <SettingsLink href="overwolf://settings/games-overlay?hotkey=show_trophy_hunter&gameId=5426">
              {showTrophyHunterHotkey}
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
            Trophy near completion
            <SettingsToggle
              checked={trophyNearCompletion}
              onChange={(event) =>
                setTrophyNearCompletion(event.target.checked)
              }
            />
          </Setting>
          <Setting>
            Trophy completed
            <SettingsToggle
              checked={trophyCompleted}
              onChange={(event) => setTrophyCompleted(event.target.checked)}
            />
          </Setting>
        </Col>
        <Divider />
        <Col>
          <h3>Second Screen</h3>
          <Setting>
            Next page hotkey
            <SettingsLink href="overwolf://settings/games-overlay?hotkey=next_page_trophy_hunter&gameId=5426">
              {nextPageHotkey}
            </SettingsLink>
          </Setting>
          <Setting>
            Show / Hide hotkey
            <SettingsLink href="overwolf://settings/games-overlay?hotkey=show_second_screen_trophy_hunter&gameId=5426">
              {showSecondScreenHotkey}
            </SettingsLink>
          </Setting>
        </Col>
      </Row>
    </>
  );
};

export default Settings;
