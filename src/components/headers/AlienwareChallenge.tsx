import { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Tooltip } from '../tooltip';
import { log } from '../../api/logs';

const Container = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
`;

const Catchline = styled.span`
  color: #00d2d7;
`;

const Text = styled.div`
  width: 180px;
  text-align: center;
  line-height: normal;
`;

const ALIENWARE_ACTION = 'ar-invite';

const AlienwareChallenge: FC = () => {
  const [campaign, setCampaign] = useState<
    overwolf.campaigns.crossapp.CrossAppCampaign
  >(null);

  useEffect(() => {
    overwolf.campaigns.crossapp.getAvailableActions((result) => {
      if (!result.success) {
        return;
      }
      const alienwareCampaign = result.actions.find(
        (campaign) =>
          campaign.action === ALIENWARE_ACTION &&
          campaign.expiration > Date.now()
      );
      log('[getAvailableActions]', result);
      if (alienwareCampaign) {
        setCampaign(alienwareCampaign);
      }
    });

    const handleAvailableActionUpdated = (
      campaign: overwolf.campaigns.crossapp.CrossAppCampaign
    ) => {
      log('[handleAvailableActionUpdated]', campaign);

      if (campaign.action === ALIENWARE_ACTION) {
        setCampaign(campaign);
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

  if (!campaign || campaign.expiration < Date.now()) {
    return null;
  }

  const handleClick = () => {
    overwolf.campaigns.crossapp.reportConversion(
      {
        id: campaign.id,
        owner_app_uid: campaign.owner_app_uid,
        data: {},
      },
      (result) => log(`[reportConversion]`, result)
    );
  };

  return (
    <Tooltip
      placement="top"
      text={
        <Text>
          <Catchline>{campaign.data.title}</Catchline> {campaign.data.text}
        </Text>
      }
    >
      <Container onClick={handleClick}>
        <img src={campaign.data.iconUrl} alt={campaign.data.name} />
      </Container>
    </Tooltip>
  );
};

export default AlienwareChallenge;
