import { FC } from 'react';
import styled from '@emotion/styled';
import SettingsButton from './SettingsButton';
import SettingsToggle from './SettingsToggle';
import usePersistentState from '../../hooks/usePersistentState';
import useHotkey from '../../hooks/useHotkey';
import { trackLink, trackSettingsChanged } from '../../api/performance';

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
  margin: 8px 0px;
  display: flex;
  justify-content: space-between;

  > * {
    margin-left: 4px;
  }
`;

const SettingsLink = styled(SettingsButton.withComponent('a'))`
  text-decoration: none;
`;

const Settings: FC = () => {
  const showTrophyHunterHotkey = useHotkey('show_trophy_hunter');
  const nextPageHotkey = useHotkey('next_page_trophy_hunter');
  const toggleMonitorHotkey = useHotkey('toggle_monitor_trophy_hunter');
  const [autoLaunch, setAutoLaunch] = usePersistentState('autoLaunch', true);
  const [trophyNearCompletion, setTrophyNearCompletion] = usePersistentState(
    'trophyNearCompletion',
    true
  );
  const [trophyCompleted, setTrophyCompleted] = usePersistentState(
    'trophyCompleted',
    true
  );
  const [changelogUpdates, setChangelogUpdates] = usePersistentState(
    'changelogUpdates',
    true
  );

  return (
    <>
      <h2>Settings</h2>
      <Row>
        <Col>
          <h3>General</h3>
          <Setting>
            Show / Hide hotkey
            <SettingsLink
              href="overwolf://settings/games-overlay?hotkey=show_trophy_hunter&gameId=5426"
              onClick={() =>
                trackLink(
                  'overwolf://settings/games-overlay?hotkey=show_trophy_hunter&gameId=5426'
                )
              }
            >
              {showTrophyHunterHotkey}
            </SettingsLink>
          </Setting>
          <Setting>
            Auto Launch
            <SettingsToggle
              checked={autoLaunch}
              onChange={(event) => {
                setAutoLaunch(event.target.checked);
                trackSettingsChanged(
                  `Auto Launch [${
                    event.target.checked ? 'checked' : 'unchecked'
                  }]`
                );
              }}
            />
          </Setting>
          <Setting>
            Changelog Updates
            <SettingsToggle
              checked={changelogUpdates}
              onChange={(event) => {
                setChangelogUpdates(event.target.checked);
                trackSettingsChanged(
                  `Changelog Updates [${
                    event.target.checked ? 'checked' : 'unchecked'
                  }]`
                );
              }}
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
              onChange={(event) => {
                setTrophyNearCompletion(event.target.checked);
                trackSettingsChanged(
                  `Trophy near completion [${
                    event.target.checked ? 'checked' : 'unchecked'
                  }]`
                );
              }}
            />
          </Setting>
          <Setting>
            Trophy completed
            <SettingsToggle
              checked={trophyCompleted}
              onChange={(event) => {
                setTrophyCompleted(event.target.checked);
                trackSettingsChanged(
                  `Trophy completed [${
                    event.target.checked ? 'checked' : 'unchecked'
                  }]`
                );
              }}
            />
          </Setting>
        </Col>
        <Divider />
        <Col>
          <h3>Second Screen</h3>
          <Setting>
            Next page hotkey
            <SettingsLink
              href="overwolf://settings/games-overlay?hotkey=next_page_trophy_hunter&gameId=5426"
              onClick={() =>
                trackLink(
                  'overwolf://settings/games-overlay?hotkey=next_page_trophy_hunter&gameId=5426'
                )
              }
            >
              {nextPageHotkey}
            </SettingsLink>
          </Setting>
          <Setting>
            Toggle monitor hotkey
            <SettingsLink
              href="overwolf://settings/games-overlay?hotkey=toggle_monitor_trophy_hunter&gameId=5426"
              onClick={() =>
                trackLink(
                  'overwolf://settings/games-overlay?hotkey=toggle_monitor_trophy_hunter&gameId=5426'
                )
              }
            >
              {toggleMonitorHotkey}
            </SettingsLink>
          </Setting>
        </Col>
      </Row>
    </>
  );
};

export default Settings;
