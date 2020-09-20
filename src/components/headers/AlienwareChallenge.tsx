import { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Tooltip } from '../tooltip';

const Container = styled.div`
  background: #00d2d7;
  width: 30px;
  height: 30px;
`;

const Catchline = styled.span`
  color: #00d2d7;
`;

const Text = styled.div`
  width: 180px;
  text-align: center;
  line-height: normal;
`;

const ALIENWARE_ACTION_ID = '';

const AlienwareChallenge: FC = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    overwolf.campaigns.crossapp.getAvailableActions((result) => {
      if (!result.success) {
        return;
      }
      const hasAlienwareAction = result.actions.some(
        (action) => action.id === ALIENWARE_ACTION_ID
      );
      if (hasAlienwareAction) {
        setActive(true);
      }
    });

    const handleAvailableActionUpdated = (
      event: overwolf.campaigns.crossapp.CrossAppCampaign
    ) => {
      if (event.id === ALIENWARE_ACTION_ID) {
        setActive(true);
      }
    };

    overwolf.campaigns.crossapp.onAvailableActionUpdated.addListener(
      handleAvailableActionUpdated
    );

    return () => {
      overwolf.campaigns.crossapp.onAvailableActionUpdated.removeListener(
        handleAvailableActionUpdated
      );
    };
  }, []);

  if (!active) {
    return null;
  }

  return (
    <Tooltip
      placement="top"
      text={
        <Text>
          <Catchline>Gewinne 650RP</Catchline> mit der
          Alienware-Herausforderung!
        </Text>
      }
    >
      <Container></Container>
    </Tooltip>
  );
};

export default AlienwareChallenge;
