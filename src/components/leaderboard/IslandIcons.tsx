import styled from '@emotion/styled';
import React from 'react';
import { CombatIcon } from '../levels/combat';
import { EpicIcon } from '../levels/epic';
import { HubIcon } from '../levels/hub';
import { ObjectivesIcon } from '../levels/objectives';
import { SkillsIcon } from '../levels/skills';
import { SpecialIcon } from '../levels/special';
import { TeamworkIcon } from '../levels/teamwork';
import { Tooltip } from '../tooltip';

type Disableable = {
  disabled: boolean;
};
const createDisableableIcon = (Icon) => styled(Icon)<Disableable>`
  opacity: ${(props) => (props.disabled ? '0.3' : '1')};
`;
const icons = {
  hub: createDisableableIcon(HubIcon),
  combat: createDisableableIcon(CombatIcon),
  skills: createDisableableIcon(SkillsIcon),
  teamwork: createDisableableIcon(TeamworkIcon),
  objectives: createDisableableIcon(ObjectivesIcon),
  epic: createDisableableIcon(EpicIcon),
  special: createDisableableIcon(SpecialIcon),
};

const Container = styled.div`
  margin-top: -3px;
  display: flex;
  flex-wrap: wrap;
  svg {
    background: #2b2a30;
    height: 20px;
    width: 20px;
    padding: 1px;
    margin-top: 3px;
  }
  svg:not(:last-child) {
    margin-right: 3px;
  }
`;

type Props = {
  islands: string[];
  className?: string;
};
const IslandIcons = ({ islands, className }: Props) => {
  return (
    <Container className={className}>
      {Object.entries(icons).map(([island, Icon]) => {
        return (
          <Tooltip
            key={island}
            text={`${island.charAt(0).toUpperCase() + island.slice(1)} Island`}
            placement="top"
          >
            <Icon disabled={!islands.includes(island)} />
          </Tooltip>
        );
      })}
    </Container>
  );
};

export default IslandIcons;
