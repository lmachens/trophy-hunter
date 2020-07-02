import { FC } from 'react';
import { useQuery } from 'react-query';
import { getStatus } from '../../api/status';
import Alert from '../icons/Alert';
import { Tooltip } from '../tooltip';

const Status: FC = () => {
  const { data, isLoading } = useQuery('status', getStatus);

  if (isLoading || !data || data.length === 0) {
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
