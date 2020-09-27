import styled from '@emotion/styled';
import { FC, useEffect } from 'react';

const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const NotificationContainer: FC = (props) => {
  useEffect(() => {
    overwolf.games.getRunningGameInfo((game) => {
      overwolf.windows.getCurrentWindow((result) => {
        overwolf.windows.changePosition(
          result.window.id,
          30,
          game.logicalHeight - 173
        );
      });
    });
  }, []);

  return <Container {...props} />;
};

export default NotificationContainer;
