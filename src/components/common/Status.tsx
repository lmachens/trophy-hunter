import { FC, useState, useEffect } from 'react';
import { useQuery, queryCache } from 'react-query';
import { getStatus } from '../../api/status';
import Alert from '../icons/Alert';
import { Tooltip } from '../tooltip';

const Status: FC = () => {
  const { data, isFetching, isError } = useQuery('status', getStatus, {
    cacheTime: 0,
  });
  const [timedout, setTimedout] = useState(false);
  useEffect(() => {
    if (!isFetching || isError) {
      return;
    }

    const timeout = setTimeout(() => {
      setTimedout(true);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isFetching, isError]);

  useEffect(() => {
    const interval = setInterval(() => {
      queryCache.invalidateQueries('status');
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!isFetching && data) {
      setTimedout(false);
    }
  }, [isFetching, data]);

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
