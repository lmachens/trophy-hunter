import { FC } from 'react';
import { useQuery } from 'react-query';
import { getStatus } from '../../api/status';
import Alert from '../icons/Alert';
import { Tooltip } from '../tooltip';

const Status: FC = () => {
  const { data: status } = useQuery('status', getStatus);

  if (!status || status.length === 0) {
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
