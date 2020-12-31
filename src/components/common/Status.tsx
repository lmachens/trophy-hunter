import { FC, useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { getStatus } from '../../api/status';
import Alert from '../icons/Alert';
import { Tooltip } from '../tooltip';

const Status: FC = () => {
  const { mutate, data, isLoading, isError } = useMutation(getStatus);
  const [timedout, setTimedout] = useState(false);

  useEffect(() => {
    if (!isLoading || isError) {
      return;
    }

    const timeout = setTimeout(() => {
      setTimedout(true);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading, isError]);

  useEffect(() => {
    const interval = setInterval(() => {
      mutate();
    }, 60000);

    mutate();

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      setTimedout(false);
    }
  }, [isLoading, data]);

  if (!isError && !timedout && (!data || data.length === 0)) {
    return null;
  }
  return (
    <Tooltip
      placement="topLeft"
      title="Trophy Hunter API is down"
      text="Please check Discord for support and updates."
      targetId="alert"
    >
      <Alert data-tooltip-id="alert" />
    </Tooltip>
  );
};

export default Status;
