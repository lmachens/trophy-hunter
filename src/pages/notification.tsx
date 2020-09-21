import { NextPage } from 'next';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import TrophyListItem from '../components/trophies/TrophyListItem';
import overwolf, { closeCurrentWindow } from '../api/overwolf';
import { getLocalStorageItem, setLocalStorageItem } from '../api/utils/storage';
import * as trophies from '../components/trophies';
import Timer from '../components/common/Timer';
import { Trophy } from '../components/trophies/types';
import NotificationHeader from '../components/notifications/NotificationHeader';
import NotificationTitle from '../components/notifications/NotificationTitle';
import NotificationContainer from '../components/notifications/NotificationContainer';

const ListItem = styled(TrophyListItem)`
  background-image: ${(props) =>
    `url(${process.env.PUBLIC_DIR}/notifications/${props.trophy.island}.png)`};
  background-position: bottom right;
  background-repeat: no-repeat;
  flex-grow: 1;
`;

const Notification: NextPage = () => {
  const [notification, setNotification] = useState<{
    trophyName: string;
    progress: number;
  }>(null);

  const loadNotification = () => {
    const notifications = getLocalStorageItem('notifications', []);
    if (
      !notifications ||
      notifications.length === 0 ||
      !Array.isArray(notifications)
    ) {
      closeCurrentWindow();
      setNotification(null);
      return;
    }
    setNotification(notifications[0]);
    setLocalStorageItem('notifications', notifications.slice(1));
  };

  useEffect(() => {
    loadNotification();
  }, []);

  if (!notification) {
    return null;
  }

  const trophy: Trophy = trophies[notification.trophyName];
  return (
    <NotificationContainer>
      <NotificationHeader
        onMouseDown={() =>
          overwolf.windows.getCurrentWindow((result) => {
            overwolf.windows.dragMove(result.window.id);
          })
        }
      >
        <NotificationTitle>
          {notification.progress === 1
            ? 'Achievement completed!'
            : 'Achievment near completion!'}
        </NotificationTitle>
        <Timer onDone={loadNotification} />
      </NotificationHeader>
      <ListItem trophy={trophy} progress={notification.progress} />
    </NotificationContainer>
  );
};

export default Notification;
