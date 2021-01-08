import { NextPage } from 'next';
import styled from '@emotion/styled';
import { closeCurrentWindow, getAppVersion } from '../api/overwolf';
import Timer from '../components/common/Timer';
import NotificationHeader from '../components/notifications/NotificationHeader';
import NotificationTitle from '../components/notifications/NotificationTitle';
import NotificationContainer from '../components/notifications/NotificationContainer';
import { log } from '../api/logs';

getAppVersion().then((version) => log(`Running ${version}`));

const Message = styled.div`
  background-image: url(${process.env.PUBLIC_DIR}/notifications/all.png);
  background-position: bottom center;
  background-repeat: no-repeat;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const NotSupported: NextPage = () => {
  return (
    <NotificationContainer>
      <NotificationHeader>
        <NotificationTitle>Game Mode Unsupported</NotificationTitle>
        <Timer onDone={closeCurrentWindow} />
      </NotificationHeader>
      <Message>
        <h3>
          Trophy Hunter is currently supporting Summoner&apos;s Rift Modes only.
        </h3>
      </Message>
    </NotificationContainer>
  );
};

export default NotSupported;
